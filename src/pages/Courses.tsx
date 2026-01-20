import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { courses, Course } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

type Level = 'all' | 'beginner' | 'intermediate' | 'advanced';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<Level>('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const levels: { value: Level; label: string }[] = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Security Courses
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn to protect yourself online with our comprehensive courses. 
              From password basics to advanced threat prevention.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Level filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {levels.map((level) => (
                <Button
                  key={level.value}
                  variant={selectedLevel === level.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level.value)}
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 lg:py-16">
        <div className="section-container">
          {filteredCourses.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-8">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLevel('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
