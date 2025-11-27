// import { socket } from "@/utils/socket";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { BookCard } from "@/components/BookCard";
// import { BookOpen, Search, Filter, ArrowLeft, Loader2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/hooks/authContext";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// import api from "@/lib/axios";
// import { toast } from "react-toastify";

// //backend Book structure
// interface Book {
//   _id: string;
//   title: string;
//   author: string;
//   subject: string;
//   price: number;
//   condition: string;
//   seller: {
//     _id: string;
//     name: string;
//     email: string;
//   };
//   organization: string;
//   class: string;
//   semester: string;
//   image?: string;
//   cloudinaryId?: string;
//   publishedYear?: number;
// }

// const ShowAllBooks = () => {
//   //Socket.IO for real-time
//   useEffect(() => {
//     socket.on("newBook", (book: Book) => setBooks((prev) => [book, ...prev]));
//     socket.on("updatedBook", (updatedBook: Book) =>
//       setBooks((prev) => prev.map((b) => (b._id === updatedBook._id ? updatedBook : b)))
//     );
//     socket.on("bookDeleted", (bookId: string) =>
//       setBooks((prev) => prev.filter((b) => b._id !== bookId))
//     );

//     return () => {
//       socket.off("newBook");
//       socket.off("updatedBook");
//       socket.off("bookDeleted");
//     };
//   }, []);

//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // State
//   const [books, setBooks] = useState<Book[]>([]);
//   const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterSubject, setFilterSubject] = useState("all");
//   const [filterCondition, setFilterCondition] = useState("all");
//   const [filterOrganization, setFilterOrganization] = useState("all");
//   const [filterClass, setFilterClass] = useState("all");
//   const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Fetch books on mount
//   useEffect(() => {
//     fetchAllBooks();
//   }, []);

//   // Apply filters whenever search/filters change
//   useEffect(() => {
//     filterBooks();
//   }, [books, searchQuery, filterSubject, filterCondition, filterOrganization, filterClass]);

//   // FETCH BOOKS using Axios
//   const fetchAllBooks = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await api.get("/books");
//       setBooks(res.data.books || []);
//       setFilteredBooks(res.data.books || []);
//     } catch (err: any) {
//       console.error("Error fetching books:", err);
//       setError(err.response?.data?.message || "Failed to load books");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //DELETE BOOK using Axios
//   const handleDeleteConfirm = async () => {
//     if (!deleteBookId) return;

//     try {
//       setIsDeleting(true);
//       await api.delete(`/books/${deleteBookId}`);

//       setBooks((prev) => prev.filter((b) => b._id !== deleteBookId));
//       toast.success("Book deleted successfully");
//     } catch (err: any) {
//       console.error("Error deleting book:", err);
//       toast.error(err.response?.data?.message || "Failed to delete book");
//     } finally {
//       setIsDeleting(false);
//       setDeleteBookId(null);
//     }
//   };

//   // Filters
//   const filterBooks = () => {
//     let result = [...books];
//     const query = searchQuery.toLowerCase();

//     if (searchQuery) {
//       result = result.filter(
//         (b) =>
//           b.title.toLowerCase().includes(query) ||
//           b.author.toLowerCase().includes(query) ||
//           b.subject.toLowerCase().includes(query) ||
//           b.organization.toLowerCase().includes(query)
//       );
//     }

//     if (filterSubject !== "all")
//       result = result.filter((b) => b.subject.toLowerCase() === filterSubject.toLowerCase());
//     if (filterCondition !== "all")
//       result = result.filter((b) => b.condition.toLowerCase() === filterCondition.toLowerCase());
//     if (filterOrganization !== "all")
//       result = result.filter((b) => b.organization.toLowerCase() === filterOrganization.toLowerCase());
//     if (filterClass !== "all")
//       result = result.filter((b) => b.class.toLowerCase() === filterClass.toLowerCase());

//     setFilteredBooks(result);
//   };

//     const handleContactSeller = (bookId: string) => {
//     if (!user) {
//       toast.error("Please login to contact sellers");
//       navigate("/login");
//       return;
//     }

//     const book = books.find((b) => b._id === bookId);
//     if (book) {
//       const subject = encodeURIComponent(`Interested in your book: ${book.title}`);
//       const body = encodeURIComponent(
//         `Hi ${book.seller.name},\n\nI'm interested in buying your book "${book.title}". Please let me know if it's still available.\n\nThanks!`
//       );
//       window.location.href = `mailto:${book.seller.email}?subject=${subject}&body=${body}`;
//     }
//   };

//   const uniqueSubjects = Array.from(new Set(books.map((b) => b.subject))).sort();
//   const uniqueOrganizations = Array.from(new Set(books.map((b) => b.organization))).sort();
//   const uniqueClasses = Array.from(new Set(books.map((b) => b.class))).sort();

//   const clearAllFilters = () => {
//     setSearchQuery("");
//     setFilterSubject("all");
//     setFilterCondition("all");
//     setFilterOrganization("all");
//     setFilterClass("all");
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-card border-b border-border py-6 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center gap-4 mb-4">
//             <Button variant="default" className="cursor-pointer bg-orange-400 hover:bg-orange-300" onClick={() => navigate("/")}>
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Home
//             </Button>
//           </div>
//           <div className="flex items-center gap-4">
//             <BookOpen className="h-8 w-8 text-primary" />
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Browse All Books</h1>
//               <p className="text-muted-foreground">
//                 {loading ? "Loading..." : `${filteredBooks.length} of ${books.length} books available`}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="py-6 px-4 sm:px-6 lg:px-8 bg-muted/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {/* Search */}
//             <div className="relative md:col-span-2">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search books, authors..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             {/* Subject Filter */}
//             <Select value={filterSubject} onValueChange={setFilterSubject}>
//               <SelectTrigger>
//                 <SelectValue className= "bg-white" placeholder="Subject" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem className="bg-white" value="all">All Subjects</SelectItem>
//                 {uniqueSubjects.map((subject) => (
//                   <SelectItem className="bg-white" key={subject} value={subject}>
//                     {subject}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Class Filter */}
//             <Select value={filterClass} onValueChange={setFilterClass}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Class" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Classes</SelectItem>
//                 {uniqueClasses.map((cls) => (
//                   <SelectItem key={cls} value={cls}>
//                     {cls}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Organization Filter */}
//             <Select value={filterOrganization} onValueChange={setFilterOrganization}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Organization" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Organizations</SelectItem>
//                 {uniqueOrganizations.map((org) => (
//                   <SelectItem key={org} value={org}>
//                     {org}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Clear Filters */}
//             <Button variant="outline" onClick={clearAllFilters}>
//               <Filter className="h-4 w-4 mr-2" />
//               Clear
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Books Grid */}
//       <div className="py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//               <span className="ml-3 text-muted-foreground">Loading books...</span>
//             </div>
//           ) : error ? (
//             <div className="text-center py-20">
//               <p className="text-red-500 mb-4">{error}</p>
//               <Button onClick={fetchAllBooks} variant="outline">
//                 Try Again
//               </Button>
//             </div>
//           ) : filteredBooks.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredBooks.map((book) => (
//                 <BookCard
//                   key={book._id}
//                   book={book}
//                   currentUserId={user?._id}
//                   onContact={handleContactSeller}
//                   onDelete={() => setDeleteBookId(book._id)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
//               <p className="text-muted-foreground mb-4">
//                 {books.length === 0
//                   ? "No books have been listed yet."
//                   : "Try adjusting your filters to see more results."}
//               </p>
//               <Button onClick={clearAllFilters} variant="outline">
//                 Clear Filters
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Delete Confirmation */}
//       <AlertDialog open={!!deleteBookId} onOpenChange={(open) => !open && setDeleteBookId(null)}>
//         <AlertDialogContent className="bg-white">
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Book</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete this book? This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDeleteConfirm}
//               disabled={isDeleting}
//               className="bg-red-500 hover:bg-red-600 cursor-pointer"
//             >
//               {isDeleting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Deleting...
//                 </>
//               ) : (
//                 "Delete"
//               )}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default ShowAllBooks;


import { socket } from "@/utils/socket";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookCard } from "@/components/BookCard";
import { BookOpen, Search, Filter, ArrowLeft, Loader2 } from "lucide-react";
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

//backend Book structure
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

const ShowAllBooks = () => {
  //Socket.IO for real-time
  useEffect(() => {
    socket.on("newBook", (book: Book) => setBooks((prev) => [book, ...prev]));
    socket.on("updatedBook", (updatedBook: Book) =>
      setBooks((prev) => prev.map((b) => (b._id === updatedBook._id ? updatedBook : b)))
    );
    socket.on("bookDeleted", (bookId: string) =>
      setBooks((prev) => prev.filter((b) => b._id !== bookId))
    );

    return () => {
      socket.off("newBook");
      socket.off("updatedBook");
      socket.off("bookDeleted");
    };
  }, []);

  const navigate = useNavigate();
  const { user } = useAuth();

  // State
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterCondition, setFilterCondition] = useState("all");
  const [filterOrganization, setFilterOrganization] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch books on mount
  useEffect(() => {
    fetchAllBooks();
  }, []);

  // Apply filters whenever search/filters change
  useEffect(() => {
    filterBooks();
  }, [books, searchQuery, filterSubject, filterCondition, filterOrganization, filterClass]);

  // FETCH BOOKS using Axios
  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/api/books");
      setBooks(res.data.books || []);
      setFilteredBooks(res.data.books || []);
    } catch (err: any) {
      console.error("Error fetching books:", err);
      setError(err.response?.data?.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  //DELETE BOOK using Axios
  const handleDeleteConfirm = async () => {
    if (!deleteBookId) return;

    try {
      setIsDeleting(true);
      await api.delete(`/api/books/${deleteBookId}`);

      setBooks((prev) => prev.filter((b) => b._id !== deleteBookId));
      toast.success("Book deleted successfully");
    } catch (err: any) {
      console.error("Error deleting book:", err);
      toast.error(err.response?.data?.message || "Failed to delete book");
    } finally {
      setIsDeleting(false);
      setDeleteBookId(null);
    }
  };

  // Filters
  const filterBooks = () => {
    let result = [...books];
    const query = searchQuery.toLowerCase();

    if (searchQuery) {
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query) ||
          b.subject.toLowerCase().includes(query) ||
          b.organization.toLowerCase().includes(query)
      );
    }

    if (filterSubject !== "all")
      result = result.filter((b) => b.subject.toLowerCase() === filterSubject.toLowerCase());
    if (filterCondition !== "all")
      result = result.filter((b) => b.condition.toLowerCase() === filterCondition.toLowerCase());
    if (filterOrganization !== "all")
      result = result.filter((b) => b.organization.toLowerCase() === filterOrganization.toLowerCase());
    if (filterClass !== "all")
      result = result.filter((b) => b.class.toLowerCase() === filterClass.toLowerCase());

    setFilteredBooks(result);
  };

    const handleContactSeller = (bookId: string) => {
    if (!user) {
      toast.error("Please login to contact sellers");
      navigate("/login");
      return;
    }

    const book = books.find((b) => b._id === bookId);
    if (book) {
      const subject = encodeURIComponent(`Interested in your book: ${book.title}`);
      const body = encodeURIComponent(
        `Hi ${book.seller.name},\n\nI'm interested in buying your book "${book.title}". Please let me know if it's still available.\n\nThanks!`
      );
      window.location.href = `mailto:${book.seller.email}?subject=${subject}&body=${body}`;
    }
  };

  const uniqueSubjects = Array.from(new Set(books.map((b) => b.subject))).sort();
  const uniqueOrganizations = Array.from(
    new Set(books.map((b) => b.organization.toLowerCase()))
  ).sort();
  const uniqueClasses = Array.from(new Set(books.map((b) => b.class))).sort();

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilterSubject("all");
    setFilterCondition("all");
    setFilterOrganization("all");
    setFilterClass("all");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="default" className="cursor-pointer bg-orange-400 hover:bg-orange-300" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Browse All Books</h1>
              <p className="text-muted-foreground">
                {loading ? "Loading..." : `${filteredBooks.length} of ${books.length} books available`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Subject Filter */}
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-full">
                <SelectValue className="bg-white truncate" placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="bg-white hover:bg-gray-200 data-[state=checked]:bg-gray-200 data-[highlighted]:bg-gray-200" value="all">All Subjects</SelectItem>
                {uniqueSubjects.map((subject) => (
                  <SelectItem className="bg-white hover:bg-gray-200 data-[state=checked]:bg-gray-200 data-[highlighted]:bg-gray-200" key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Class Filter */}
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-full">
                <SelectValue className="truncate" placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="bg-white hover:bg-gray-200 data-[state=checked]:bg-gray-200 data-[highlighted]:bg-gray-200">All Classes</SelectItem>
                {uniqueClasses.map((cls) => (
                  <SelectItem className="bg-white hover:bg-gray-200 data-[state=checked]:bg-gray-200 data-[highlighted]:bg-gray-200" key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Organization Filter */}
            <Select value={filterOrganization} onValueChange={setFilterOrganization}>
              <SelectTrigger className="w-full">
                <SelectValue className="truncate" placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="bg-white hover:bg-gray-200 data-[state=checked]:bg-gray-200 data-[highlighted]:bg-gray-200">All Organizations</SelectItem>
                {uniqueOrganizations.map((org) => (
                  <SelectItem key={org} value={org} className="capitalize bg-white hover:bg-gray-200 data-[state=checked]:bg-gray-200 data-[highlighted]:bg-gray-200">
                    {org}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button variant="outline" onClick={clearAllFilters} className="bg-white hover:bg-gray-200 data-[state=checked]:bg-gray-200 data-[highlighted]:bg-gray-200">
              <Filter className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading books...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchAllBooks} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  currentUserId={user?._id}
                  onContact={handleContactSeller}
                  onDelete={() => setDeleteBookId(book._id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                {books.length === 0
                  ? "No books have been listed yet."
                  : "Try adjusting your filters to see more results."}
              </p>
              <Button onClick={clearAllFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteBookId} onOpenChange={(open) => !open && setDeleteBookId(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Book</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this book? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 cursor-pointer"
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

export default ShowAllBooks;