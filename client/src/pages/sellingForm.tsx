import { useState } from "react";
import { useAuth } from "@/hooks/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Book,
  User,
  Calendar,
  IndianRupee,
  FileText,
  Image,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";

const SellBook = () => {
  const { user } = useAuth();
  const [bookTitle, setBookTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [author, setAuthor] = useState("");
  const [semester, setSemester] = useState("");
  const [price, setPrice] = useState("");
  const [bookImage, setBookImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [organizations, setOrganization] = useState("");
  const [className, setClassName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  // Only logged-in users can access
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-blue-500">Please login to sell books.</p>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setBookImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", bookTitle);
      formData.append("subject", subject);
      formData.append("author", author);
      formData.append("semester", semester);
      formData.append("price", price);
      formData.append("organization", organizations);
      formData.append("class", className);
      if (bookImage) formData.append("image", bookImage);

      await api.post(
        "/api/books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Book listed successfully!");

      // Reset form
      setBookTitle("");
      setSubject("");
      setAuthor("");
      setSemester("");
      setPrice("");
      setBookImage(null);
      setImagePreview("");
      setOrganization("");
      setClassName("");
    } catch (error: any) {
      console.error("Failed to list book:", error);
      
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        "Failed to list book!";
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 w-full overflow-x-hidden py-8 px-4">
      <div className="flex items-center justify-center w-full">
        <div className="max-w-2xl w-full space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pointer-hand"
               onClick={() => navigate("/")}>
                RE-READ 
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Sell Your Book
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 px-4">
              List your book for sale and connect with students who need it
            </p>
          </div>

          <Card className="shadow-lg border-slate-200 dark:border-slate-700 mx-4 sm:mx-0">
            <CardHeader className="space-y-1 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl text-center">
                Book Details
              </CardTitle>
              <CardDescription className="text-center text-sm">
                Fill in the information about the book you want to sell
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 px-4 sm:px-6">
                {/* Book Title */}
                <div className="space-y-2">
                  <Label htmlFor="bookTitle" className="text-sm">
                    Book Title
                  </Label>
                  <div className="relative">
                    <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <Input
                      id="bookTitle"
                      type="text"
                      placeholder="Enter book title"
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      className="pl-10 text-sm selection:bg-blue-500 selection:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm">
                    Subject
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <Input
                      id="subject"
                      type="text"
                      placeholder="e.g., Mathematics, Physics"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="pl-10 text-sm selection:bg-blue-500 selection:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-sm">
                    Author
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <Input
                      id="author"
                      type="text"
                      placeholder="Enter author name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="pl-10 text-sm selection:bg-blue-500 selection:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Organization */}
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-sm">
                    Organization
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Enter college/school/organization name"
                      value={organizations}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="pl-10 text-sm selection:bg-blue-500 selection:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Class */}
                <div className="space-y-2">
                  <Label htmlFor="class" className="text-sm">
                    Class
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <Input
                      id="class"
                      type="text"
                      placeholder="Enter Class eg., BSc, BCA, 12th"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="pl-10 text-sm selection:bg-blue-500 selection:text-white"
                      required
                    />
                  </div>
                </div>
                {/* Semester */}
                <div className="space-y-2">
                  <Label htmlFor="semester" className="text-sm">
                    Semester
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <Input
                      list="semesters"
                      id="semester"
                      type="text"
                      placeholder="Select or type semester (e.g., 1st, 2nd, or N/A)"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="pl-10 text-sm selection:bg-blue-500 selection:text-white"
                      required
                    />
                    <datalist id="semesters">
                      <option value="N/A">Not Applicable (School/Other)</option>
                      <option value="1st">1st Semester</option>
                      <option value="2nd">2nd Semester</option>
                      <option value="3rd">3rd Semester</option>
                      <option value="4th">4th Semester</option>
                      <option value="5th">5th Semester</option>
                      <option value="6th">6th Semester</option>
                      <option value="7th">7th Semester</option>
                      <option value="8th">8th Semester</option>
                    </datalist>
                  </div>
                  <p className="text-xs text-slate-500">
                    Select from dropdown or type custom value. Use "N/A" if books belong to schools or other organizations.
                  </p>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm">
                    Price
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="pl-10 text-sm selection:bg-blue-500 selection:text-white"
                      required
                      min="0"
                      step="1"
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="space-y-2">
                  <Label htmlFor="bookImage" className="text-sm">
                    Book Image
                  </Label>
                  <div className="space-y-3">
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                      <Input
                        id="bookImage"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="pl-10 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>

                    {imagePreview && (
                      <div className="relative w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Book preview"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setBookImage(null);
                            setImagePreview("");
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Max file size: 5MB. Supported formats: JPG, PNG, GIF
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Listing Book..." : "List Book for Sale"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="text-center px-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Want to browse books instead?{" "}
              <a
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Go to Home
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellBook;