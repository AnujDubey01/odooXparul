"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, SlidersHorizontal, Plane, CheckCircle, Clock } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import TripCard from "@/components/TripCard";
import { mockTrips, Trip } from "@/lib/mockData";

const tabs = [
  { id: "all", label: "All Trips", icon: Plane },
  { id: "upcoming", label: "Upcoming", icon: Clock },
  { id: "ongoing", label: "Ongoing", icon: Plane },
  { id: "completed", label: "Completed", icon: CheckCircle },
];

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const handleDelete = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = trips.filter((t) => {
    const matchesTab = activeTab === "all" || t.status === activeTab;
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.destinations.some((d) => d.toLowerCase().includes(search.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    if (sortBy === "budget") return b.totalBudget - a.totalBudget;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const counts = {
    all: trips.length,
    upcoming: trips.filter((t) => t.status === "upcoming").length,
    ongoing: trips.filter((t) => t.status === "ongoing").length,
    completed: trips.filter((t) => t.status === "completed").length,
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
            <p className="text-gray-500 mt-1">{trips.length} trips planned</p>
          </div>
          <Link
            href="/trips/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            New Trip
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search trips or destinations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:border-orange-400 cursor-pointer"
            >
              <option value="date">Sort by Date</option>
              <option value="budget">Sort by Budget</option>
              <option value="name">Sort by Name</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === id
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {counts[id as keyof typeof counts]}
              </span>
            </button>
          ))}
        </div>

        {/* Trip Grid */}
        <AnimatePresence mode="wait">
          {sorted.length > 0 ? (
            <motion.div
              key={activeTab + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {sorted.map((trip, i) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <TripCard trip={trip} onDelete={handleDelete} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
                <Plane className="w-10 h-10 text-orange-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No trips found</h3>
              <p className="text-gray-500 mb-6">
                {search ? `No trips match "${search}"` : "Start planning your first adventure!"}
              </p>
              <Link
                href="/trips/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Trip
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
