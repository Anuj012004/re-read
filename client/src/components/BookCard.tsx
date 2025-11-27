import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Trash2 } from "lucide-react";

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

interface BookCardProps {
  book: Book;
  currentUserId?: string | null;
  onContact: (bookId: string) => void;
  onDelete?: (bookId: string) => void;
  onEdit?: (bookId: string) => void;
}

export const BookCard = ({ book, currentUserId, onContact, onDelete }: BookCardProps) => {
  // Check if current user is the seller
  const isSeller = currentUserId && book.seller._id === currentUserId;

  // Format condition for display (e.g., "like-new" → "Like New")
  const formatCondition = (condition: string) => {
    return condition
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Fallback image if no image provided
  const bookImage = book.image || 'https://via.placeholder.com/300x400?text=No+Image';

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 overflow-hidden p-0">
      {/* Book Image */}
      <div className="aspect-[3/4] bg-muted overflow-hidden relative">
        <img 
          src={bookImage} 
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        
        {/* Seller Badge */}
        {isSeller && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Your Book
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="p-4">
          {/* Subject and Class Info */}
          <div className="flex items-start justify-between mb-2 gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {book.subject}
            </Badge>
            <Badge variant="outline" className="text-xs">
            Semester- {book.semester}
            </Badge>
          </div>
          
          {/* Book Title */}
          <h3 className="font-bold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          
          {/* Author */}
          <p className="text-sm text-muted-foreground mb-2 font-semibold">
            Author- {book.author}
          </p>

          {/* Class */}
          <p className="text-sm text-muted-foreground mb-3 font-medium">
            Class- {book.class}
          </p>
          
          {/* Price and Condition */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-primary">₹{book.price}</span>
              {book.publishedYear && (
                <span className="text-xs text-muted-foreground">({book.publishedYear})</span>
              )}
            </div>
            <Badge 
              variant={
                book.condition === 'new' || book.condition === 'like-new' 
                  ? 'default' 
                  : 'secondary'
              } 
              className="text-xs"
            >
              {formatCondition(book.condition)}
            </Badge>
          </div>
          
          {/* Seller and Organization Info */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{book.seller.name}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{book.organization}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Action Button */}
      <CardFooter className="p-4 pt-0">
        {isSeller && onDelete ? (
          <Button
            variant="destructive"
            size="sm"
            className="w-full shadow-button bg-red-500 hover:shadow-card hover:bg-red-300 transition-all cursor-pointer"
            onClick={() => onDelete(book._id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Book
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="w-full bg-orange-400 shadow-button hover:shadow-card hover:bg-orange-300 transition-all cursor-pointer"
            onClick={() => onContact(book._id)}
          >
            Contact Seller
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { User, MapPin, Trash2 } from "lucide-react";

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

// interface BookCardProps {
//   book: Book;
//   currentUserId?: string | null;
//   onContact: (bookId: string) => void;
//   onDelete?: (bookId: string) => void;
//   onEdit?: (bookId: string) => void;
// }

// export const BookCard = ({ book, currentUserId, onContact, onDelete }: BookCardProps) => {
//   // Check if current user is the seller
//   const isSeller = currentUserId && book.seller._id === currentUserId;

//   // Format condition for display (e.g., "like-new" → "Like New")
//   const formatCondition = (condition: string) => {
//     return condition
//       .split('-')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   // Fallback image if no image provided
//   const bookImage = book.image || 'https://via.placeholder.com/300x400?text=No+Image';

//   return (
//     <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 overflow-hidden p-0 flex flex-col h-full">
//       {/* Book Image - Reduced aspect ratio */}
//       <div className="aspect-[4/3] bg-muted relative flex items-center justify-center flex-shrink-0">
//         <img 
//           src={bookImage} 
//           alt={book.title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           onError={(e) => {
//             // Fallback if image fails to load
//             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image';
//           }}
//         />
        
//         {/* Seller Badge */}
//         {isSeller && (
//           <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
//             Your Book
//           </div>
//         )}
//       </div>
      
//       <CardContent className="p-3 flex-grow flex flex-col">
//         {/* Subject and Class Info */}
//         <div className="flex items-center justify-between mb-2 gap-2">
//           <Badge variant="secondary" className="text-xs px-2 py-0">
//             {book.subject}
//           </Badge>
//           <Badge variant="outline" className="text-xs px-2 py-0">
//             Sem {book.semester}
//           </Badge>
//         </div>
        
//         {/* Book Title */}
//         <h3 className="font-bold text-sm text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
//           {book.title}
//         </h3>
        
//         {/* Author & Class in one line */}
//         <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
//           <span className="truncate">by {book.author}</span>
//           <span className="text-xs ml-2 flex-shrink-0">Class {book.class}</span>
//         </div>
        
//         {/* Price and Condition */}
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-baseline gap-1">
//             <span className="text-lg font-bold text-primary">₹{book.price}</span>
//             {book.publishedYear && (
//               <span className="text-xs text-muted-foreground">'{book.publishedYear.toString().slice(-2)}</span>
//             )}
//           </div>
//           <Badge 
//             variant={
//               book.condition === 'new' || book.condition === 'like-new' 
//                 ? 'default' 
//                 : 'secondary'
//             } 
//             className="text-xs px-2 py-0"
//           >
//             {formatCondition(book.condition)}
//           </Badge>
//         </div>
        
//         {/* Seller and Organization Info - More compact */}
//         <div className="flex items-center justify-between text-xs text-muted-foreground gap-2 mt-auto">
//           <div className="flex items-center min-w-0 flex-1">
//             <User className="h-3 w-3 mr-1 flex-shrink-0" />
//             <span className="truncate">{book.seller.name}</span>
//           </div>
//           <div className="flex items-center min-w-0 flex-1">
//             <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
//             <span className="truncate">{book.organization}</span>
//           </div>
//         </div>
//       </CardContent>
      
//       {/* Action Button */}
//       <CardFooter className="p-3 pt-0 mt-auto flex-shrink-0">
//         {isSeller && onDelete ? (
//           <Button
//             variant="destructive"
//             size="sm"
//             className="w-full h-8 shadow-button hover:shadow-card transition-all cursor-pointer text-xs"
//             onClick={() => onDelete(book._id)}
//           >
//             <Trash2 className="h-3 w-3 mr-2" />
//             Delete Book
//           </Button>
//         ) : (
//           <Button
//             variant="default"
//             size="sm"
//             className="w-full h-8 bg-orange-400 shadow-button hover:shadow-card transition-all cursor-pointer text-xs"
//             onClick={() => onContact(book._id)}
//           >
//             Contact Seller
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };