"use client";

import { useState, useEffect } from "react";
import { 
  Leaf, LogOut, Upload, Trash2, Image as ImageIcon, 
  Loader2, AlertCircle, CheckCircle, FolderOpen, Plus, X 
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface GalleryImage {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  createdTime: string;
  category: string;
  url: string;
}

const CATEGORIES = ["farm", "production", "products", "visitors"];

export default function AdminDashboard() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Upload states
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState("farm");
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Filter tab state
  const [activeTab, setActiveTab] = useState<string>("all");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) {
        setLoading(true);
      }
    });

    const loadImages = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (res.ok && data.success && active) {
          setImages(data.images);
        } else if (active) {
          setError(data.message || "Failed to load images");
        }
      } catch {
        if (active) {
          setError("Network error: failed to fetch images");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      active = false;
    };
  }, [refreshTrigger]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showErrorNotification("Please select a valid image file.");
        return;
      }
      setUploadFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUpload = () => {
    setUploadFile(null);
    setUploadPreview(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("category", uploadCategory);

    try {
      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showSuccessNotification("Image uploaded successfully!");
        clearUpload();
        setRefreshTrigger((prev) => prev + 1);
      } else {
        showErrorNotification(data.message || "Upload failed");
      }
    } catch {
      showErrorNotification("Network error. Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image from Google Drive?")) return;

    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/gallery/delete?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showSuccessNotification("Image deleted successfully!");
        setImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        showErrorNotification(data.message || "Failed to delete image");
      }
    } catch {
      showErrorNotification("Network error. Deletion failed.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin";
    } catch {
      window.location.href = "/admin";
    }
  };

  const showErrorNotification = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(""), 6000);
  };

  const showSuccessNotification = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 6000);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const filteredImages = activeTab === "all" 
    ? images 
    : images.filter((img) => img.category.toLowerCase() === activeTab);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-foreground flex flex-col font-outfit">
      {/* Top Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-outfit">Green Hills Agri</h1>
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Gallery Dashboard</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700 flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-10 max-w-7xl grid lg:grid-cols-12 gap-8">
        
        {/* Left Side: Upload Panel (lg:col-span-4) */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-border p-6 shadow-sm sticky top-28">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload New Image
            </h2>

            {/* Notifications */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-start gap-3 mb-4 animate-fadeIn">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm border border-green-100 flex items-start gap-3 mb-4 animate-fadeIn">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-6">
              {/* Category selector */}
              <div>
                <label className="text-sm font-semibold text-muted-foreground block mb-2">Category Folder</label>
                <select 
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all capitalize"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Upload Input Area */}
              <div>
                <label className="text-sm font-semibold text-muted-foreground block mb-2">Image File</label>
                {!uploadPreview ? (
                  <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-2xl flex flex-col items-center justify-center p-8 bg-muted/20 relative cursor-pointer group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="w-12 h-12 bg-white border border-border shadow-sm rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all mb-3">
                      <Plus className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-center">Click to upload or drag & drop</p>
                    <p className="text-xs text-muted-foreground text-center mt-1">PNG, JPG, JPEG, WEBP up to 5MB</p>
                  </div>
                ) : (
                  <div className="relative border border-border rounded-2xl overflow-hidden bg-muted/20 aspect-video flex items-center justify-center p-2">
                    <img 
                      src={uploadPreview} 
                      alt="Upload Preview" 
                      className="max-h-full max-w-full object-contain rounded-xl"
                    />
                    <button 
                      type="button"
                      onClick={clearUpload}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors shadow-md"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={!uploadFile || uploading}>
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Uploading to Google Drive...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Image
                  </>
                )}
              </Button>
            </form>
          </div>
        </section>

        {/* Right Side: Media Library (lg:col-span-8) */}
        <section className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-border p-6 shadow-sm min-h-[500px] flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-6 gap-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-primary" />
                Image Library
              </h2>
              
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-muted/50 rounded-xl">
                {["all", ...CATEGORIES].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                      activeTab === tab 
                        ? "bg-white text-primary shadow-sm" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Loader State */}
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
                <p className="text-sm font-semibold">Loading media files...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-muted-foreground text-center">
                <div className="w-16 h-16 bg-muted/80 rounded-full flex items-center justify-center text-muted-foreground mb-4">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground">No images found</h3>
                <p className="text-sm text-muted-foreground max-w-xs mt-1">Upload images using the form on the left or select a different category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
                {filteredImages.map((img) => (
                  <div 
                    key={img.id}
                    className="group relative bg-muted/10 border border-border/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
                  >
                    {/* Thumbnail Image */}
                    <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden relative border-b border-border">
                      <img 
                        src={img.url} 
                        alt={img.name} 
                        loading="lazy"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Delete Overlay Button */}
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="absolute bottom-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        title="Delete image"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>

                      {/* Category Badge overlay */}
                      {activeTab === "all" && (
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-sm">
                            {img.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="p-3 text-xs leading-normal">
                      <p className="font-semibold text-foreground truncate" title={img.name}>
                        {img.name}
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        {formatSize(img.size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-auto py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Green Hills Agriculture. Gallery Storage is synced live with Google Drive.
        </div>
      </footer>
    </div>
  );
}
