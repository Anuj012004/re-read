import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/BookCard";
import { BookOpen, Mail, Calendar, ArrowLeft, Loader2, User, CirclePlus} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/authContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { socket } from "@/utils/socket";

interface Book {
  _id: string;
  title: string;
  author: string;
  subject: string;
  price: number;
  condition: string;
  seller: {
    _id: string;
    name: string;
    email: string;
  };
  organization: string;
  class: string;
  semester: string;
  image?: string;
  cloudinaryId?: string;
  publishedYear?: number;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Socket.IO for real-time updates
  useEffect(() => {
    socket.on("newBook", (book: Book) => {
      if (book.seller._id === user?._id) {
        setMyBooks((prev) => [book, ...prev]);
      }
    });

    socket.on("updatedBook", (updatedBook: Book) => {
      if (updatedBook.seller._id === user?._id) {
        setMyBooks((prev) =>
          prev.map((b) => (b._id === updatedBook._id ? updatedBook : b))
        );
      }
    });

    socket.on("bookDeleted", (bookId: string) => {
      setMyBooks((prev) => prev.filter((b) => b._id !== bookId));
    });

    return () => {
      socket.off("newBook");
      socket.off("updatedBook");
      socket.off("bookDeleted");
    };
  }, [user?._id]);

  // Fetch user's books on mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchMyBooks();
  }, [user, navigate]);

  // Fetch books uploaded by the current user
  const fetchMyBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/books/my-books");

      // Populate seller field if missing
      const booksWithSeller = (res.data.books || []).map((book: any) => ({
        ...book,
        seller: book.seller || {
          _id: user?._id,
          name: user?.name,
          email: user?.email,
        },
      }));

      setMyBooks(booksWithSeller);
    } catch (err: any) {
      console.error("Error fetching user books:", err);
      setError(err.response?.data?.message || "Failed to load your books");
      toast.error(err.response?.data?.message || "Failed to fetch your books");
    } finally {
      setLoading(false);
    }
  };

  // Delete book
  const handleDeleteConfirm = async () => {
    if (!deleteBookId) return;

    try {
      setIsDeleting(true);
      await api.delete(`/books/${deleteBookId}`);

      setMyBooks((prev) => prev.filter((b) => b._id !== deleteBookId));
      toast.success("Book deleted successfully");
    } catch (err: any) {
      console.error("Error deleting book:", err);
      toast.error(err.response?.data?.message || "Failed to delete book");
    } finally {
      setIsDeleting(false);
      setDeleteBookId(null);
    }
  };

  const handleContactSeller = (bookId: string) => {
    const book = myBooks.find((b) => b._id === bookId);
    if (book) {
      const subject = encodeURIComponent(`About your book: ${book.title}`);
      const body = encodeURIComponent(
        `Hi ${book.seller.name},\n\nI'm contacting you about your book "${book.title}".\n\nThanks!`
      );
      window.location.href = `mailto:${book.seller.email}?subject=${subject}&body=${body}`;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Actions Section */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Books */}
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow">
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{myBooks.length}</p>
              <p className="text-sm text-muted-foreground mb-3">Books Listed</p>
            </div>

            {/* Sell Book */}
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <button
                onClick={() => navigate("/sellbook")}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 mb-3"
              >
                <CirclePlus className="h-6 w-6" />
              </button>
              <p className="text-lg font-semibold text-foreground">Sell Book</p>
              <p className="text-sm text-muted-foreground mt-1">
              </p>
            </div>

            {/* Browse Books */}
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <button
                onClick={() => navigate("/allbooks")}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 mb-3"
              >
                <BookOpen className="h-6 w-6" />
              </button>
              <p className="text-lg font-semibold text-foreground">Browse Books</p>
              <p className="text-sm text-muted-foreground mt-1">
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My Books Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">My Books</h2>
            {/* <Button onClick={() => navigate("/upload")}>
              <BookOpen className="h-4 w-4 mr-2" />
              Upload New Book
            </Button> */}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading your books...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchMyBooks} variant="outline">
                Try Again
              </Button>
            </div>
          ) : myBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myBooks.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  currentUserId={user._id}
                  onContact={handleContactSeller}
                  onDelete={() => setDeleteBookId(book._id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No books uploaded yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start by uploading your first book to share with others!
              </p>
              <Button onClick={() => navigate("/upload")}>
                <BookOpen className="h-4 w-4 mr-2" />
                Upload Your First Book
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteBookId} onOpenChange={(open) => !open && setDeleteBookId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Book</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this book? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfilePage;
