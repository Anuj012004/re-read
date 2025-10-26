import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookCard } from "./BookCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Building2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/authContext";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { socket } from "@/utils/socket";

interface Book {
  _id: string;
  title: string;
  author: string;
  subject: string;
  price: number;
  condition: string;
  seller: { _id: string; name: string; email: string };
  organization: string;
  class: string;
  semester: string;
  image?: string;
  cloudinaryId?: string;
  publishedYear?: number;
}

interface Organization {
  name: string;
  bookCount: number;
  studentCount: number;
}

interface BooksShowcaseProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

export const BooksShowcase = ({ isLoggedIn, onLogin }: BooksShowcaseProps) => {
  const [activeTab, setActiveTab] = useState("books");
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]); // Store all books for organization calculation
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch all books and calculate organizations
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/books", { withCredentials: true });
      const fetchedBooks = res.data.books || [];
      
      setAllBooks(fetchedBooks);
      
      // Show only first 6 books for showcase
      const limitedBooks = fetchedBooks.slice(0, 6);
      setBooks(limitedBooks);
      
      // Calculate organizations from books
      calculateOrganizations(fetchedBooks);
      
      // toast.success("Books loaded successfully 📚");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch books");
      toast.error(err.response?.data?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  // Calculate unique organizations with book and student counts
  const calculateOrganizations = (booksData: Book[]) => {
    const orgMap = new Map<string, { originalName: string; bookCount: number; sellers: Set<string> }>();

    booksData.forEach(book => {
      if (!book.organization) return;
      
      // Normalize to lowercase for comparison
      const normalizedOrg = book.organization.toLowerCase();
      
      if (!orgMap.has(normalizedOrg)) {
        orgMap.set(normalizedOrg, {
          originalName: book.organization, // Keep the first occurrence's casing
          bookCount: 0,
          sellers: new Set()
        });
      }

      const orgData = orgMap.get(normalizedOrg)!;
      orgData.bookCount++;
      orgData.sellers.add(book.seller._id);
    });

    // Convert to array and sort by book count
    const orgsArray: Organization[] = Array.from(orgMap.entries())
      .map(([_, data]) => ({
        name: data.originalName,
        bookCount: data.bookCount,
        studentCount: data.sellers.size
      }))
      .sort((a, b) => b.bookCount - a.bookCount);

    setOrganizations(orgsArray);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Socket.IO real-time updates
  useEffect(() => {
    socket.on("newBook", (book: Book) => {
      setAllBooks(prev => {
        const updated = [book, ...prev];
        calculateOrganizations(updated);
        return updated;
      });
      setBooks(prev => [book, ...prev].slice(0, 6));
      toast.info(`New book added: "${book.title}"`);
    });

    socket.on("bookDeleted", (bookId: string) => {
      setAllBooks(prev => {
        const updated = prev.filter(b => b._id !== bookId);
        calculateOrganizations(updated);
        return updated;
      });
      setBooks(prev => prev.filter(b => b._id !== bookId));
      toast.info("A book was deleted");
    });

    return () => {
      socket.off("newBook");
      socket.off("bookDeleted");
    };
  }, []);

  // Contact seller
  const handleContactSeller = (bookId: string) => {
    if (!isLoggedIn) {
      toast.info('Login to contact book seller')
      onLogin();
      return;
    }
    const book = books.find(b => b._id === bookId);
    if (book) {
      const subject = encodeURIComponent(`Interested in your book: ${book.title}`);
      const body = encodeURIComponent(
        `Hi ${book.seller.name},\n\nI'm interested in buying your book "${book.title}". Please let me know if it's still available.\n\nThanks!`
      );
      window.location.href = `mailto:${book.seller.email}?subject=${subject}&body=${body}`;
    }
  };

  const handleBrowseAll = () => navigate("/allbooks");

  // View books by organization
  const handleViewOrganization = (orgName: string) => {
    setSelectedOrg(orgName);
    setActiveTab("books");
    
    // Filter books by organization (case-insensitive)
    const filteredBooks = allBooks.filter(
      book => book.organization.toLowerCase() === orgName.toLowerCase()
    );
    setBooks(filteredBooks);
  };

  // Reset to show all books
  const handleShowAllBooks = () => {
    setSelectedOrg(null);
    setBooks(allBooks.slice(0, 6));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Available Books & Organizations
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse books and connect with students from your institution
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="books" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Books
              </TabsTrigger>
              <TabsTrigger value="organizations" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Organizations
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Books Tab */}
          <TabsContent value="books">
            {selectedOrg && (
              <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Books from {selectedOrg}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Showing {books.length} book{books.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Button 
                    onClick={handleShowAllBooks}
                    variant="outline"
                    size="sm"
                  >
                    Show All Books
                  </Button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading books...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={fetchBooks} variant="outline">Try Again</Button>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4 text-lg">
                  {selectedOrg ? `No books available from ${selectedOrg}` : 'No books available yet'}
                </p>
                {selectedOrg ? (
                  <Button onClick={handleShowAllBooks} variant="default">
                    View All Books
                  </Button>
                ) : (
                  <Button onClick={() => navigate("/sellbook")} variant="default">
                    List Your First Book
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {books.map(book => (
                    <BookCard
                      key={book._id}
                      book={book}
                      currentUserId={user?._id}
                      onContact={handleContactSeller}
                    />
                  ))}
                </div>

                <div className="text-center">
                  {!selectedOrg && (
                    <Button variant="default" size="lg" onClick={handleBrowseAll}>
                      Browse All Books
                    </Button>
                  )}
                </div>
              </>
            )}
          </TabsContent>

          {/* Organizations Tab */}
          <TabsContent value="organizations">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading organizations...</span>
              </div>
            ) : organizations.length === 0 ? (
              <div className="text-center py-20">
                <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4 text-lg">No organizations found</p>
                <p className="text-sm text-muted-foreground">Organizations will appear once books are listed</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {organizations.map((org, index) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:border-primary/50"
                      onClick={() => handleViewOrganization(org.name)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Building2 className="h-8 w-8 text-primary" />
                        <div className="text-right">
                          <span className="text-2xl font-bold text-primary">{org.bookCount}</span>
                          <p className="text-xs text-muted-foreground">Books</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 truncate" title={org.name}>
                        {org.name}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{org.studentCount} Active Student{org.studentCount !== 1 ? 's' : ''}</span>
                        <span className="text-primary font-medium hover:underline">View Books →</span>
                      </div>
                    </div>
                  ))}
                </div>
                   {/* <div className="text-center">
                  {!selectedOrg && (
                    <Button variant="default" size="lg" onClick={handleBrowseAll}>
                      Browse All Books
                    </Button>
                  )}
                </div> */}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};