"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Calendar,
  MapPin,
  FileText,
  Tag,
  Globe,
  Lock,
  CheckCircle,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import PageWrapper from "@/components/PageWrapper";

const suggestedDestinations = [
  { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=80" },
  { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&q=80" },
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=80" },
  { name: "New York, USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&q=80" },
  { name: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&q=80" },
  { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200&q=80" },
];

const coverImages = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&q=80",
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80",
];

export default function NewTripPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    isPublic: true,
    tags: [] as string[],
    coverImage: coverImages[0],
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [coverPickerOpen, setCoverPickerOpen] = useState(false);

  const update = (field: string, value: unknown) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      update("tags", [...form.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    update("tags", form.tags.filter((t) => t !== tag));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Trip name is required";
    if (!form.startDate) e.startDate = "Start date is required";
    if (!form.endDate) e.endDate = "End date is required";
    if (form.startDate && form.endDate && form.startDate > form.endDate) e.endDate = "End date must be after start date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push("/trips/trip-1/builder");
  };

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/trips" className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Trip</h1>
            <p className="text-gray-500 text-sm">Fill in the details to start planning</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Name */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-50">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500" /> Trip Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Trip Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="e.g. European Summer Adventure"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-orange-400 focus:bg-white"}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Describe your trip — what's the vibe, what are you excited about?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/20 resize-none"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Dates */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-50">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-500" /> Travel Dates
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date *</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => update("startDate", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${errors.startDate ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-orange-400 focus:bg-white"}`}
                    />
                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date *</label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => update("endDate", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${errors.endDate ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-orange-400 focus:bg-white"}`}
                    />
                    {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                  </div>
                </div>
                {form.startDate && form.endDate && form.startDate <= form.endDate && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    {Math.ceil((new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) / (1000 * 60 * 60 * 24))} days trip
                  </div>
                )}
              </motion.div>

              {/* Budget */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-50">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-orange-500 font-bold text-sm">$</span> Budget
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Budget (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                    <input
                      type="number"
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      placeholder="5000"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-50">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-500" /> Tags
                </h2>
                <div className="flex gap-2 mb-3">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add a tag (e.g. Beach, Culture)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-400 focus:bg-white"
                  />
                  <button type="button" onClick={addTag} className="px-4 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors">
                    Add
                  </button>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="text-orange-400 hover:text-orange-600">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Privacy */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-50">
                <h2 className="font-bold text-gray-900 mb-4">Privacy</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: true, icon: Globe, label: "Public", desc: "Anyone with the link can view" },
                    { value: false, icon: Lock, label: "Private", desc: "Only you can see this trip" },
                  ].map(({ value, icon: Icon, label, desc }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => update("isPublic", value)}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        form.isPublic === value
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mt-0.5 ${form.isPublic === value ? "text-orange-500" : "text-gray-400"}`} />
                      <div>
                        <p className={`font-semibold text-sm ${form.isPublic === value ? "text-orange-600" : "text-gray-700"}`}>{label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Submit */}
              <div className="flex gap-3">
                <Link href="/trips" className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-md"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Create Trip & Build Itinerary
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right — Cover & Suggestions */}
          <div className="space-y-6">
            {/* Cover Image */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 shadow-card border border-gray-50">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-orange-500" /> Cover Image
              </h3>
              <div className="relative h-36 rounded-xl overflow-hidden mb-3 group cursor-pointer" onClick={() => setCoverPickerOpen(!coverPickerOpen)}>
                <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <Upload className="w-4 h-4" /> Change Cover
                  </div>
                </div>
              </div>
              {coverPickerOpen && (
                <div className="grid grid-cols-3 gap-2">
                  {coverImages.map((img) => (
                    <div
                      key={img}
                      onClick={() => { update("coverImage", img); setCoverPickerOpen(false); }}
                      className={`h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${form.coverImage === img ? "border-orange-500" : "border-transparent hover:border-orange-300"}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Suggested Destinations */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-5 shadow-card border border-gray-50">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" /> Suggested Places to Visit
              </h3>
              <div className="space-y-2">
                {suggestedDestinations.map((dest) => (
                  <div key={dest.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{dest.name}</span>
                    <button className="ml-auto text-xs text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
