import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SecurityTip } from "@/components/SecurityTip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCourseById, getLessonById, getLessonsByCourseId } from "@/data/courses";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  PlayCircle, 
  Clock,
  BookOpen
} from "lucide-react";

const Lesson = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const course = getCourseById(courseId || "");
  const lesson = getLessonById(lessonId || "");
  const allLessons = getLessonsByCourseId(courseId || "");
  
  const [isCompleted, setIsCompleted] = useState(false);

  if (!course || !lesson) {
    return (
      <Layout>
        <div className="section-container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The lesson you're looking for doesn't exist.
          </p>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <div className="section-container py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/courses" className="hover:text-foreground transition-colors">
              Courses
            </Link>
            <span>/</span>
            <Link to={`/courses/${course.id}`} className="hover:text-foreground transition-colors">
              {course.title}
            </Link>
            <span>/</span>
            <span className="text-foreground">{lesson.title}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Player Placeholder */}
              <Card className="overflow-hidden mb-8 animate-fade-in">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <PlayCircle className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Video lesson placeholder</p>
                    <p className="text-sm text-muted-foreground mt-1">{lesson.duration}</p>
                  </div>
                </div>
              </Card>

              {/* Lesson Header */}
              <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-success text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Completed
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Lesson {currentIndex + 1} of {allLessons.length}
                  </span>
                </div>
              </div>

              {/* Lesson Content */}
              <Card className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-6 lg:p-8">
                  <div className="prose prose-slate max-w-none">
                    {lesson.content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('# ')) {
                        return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{paragraph.replace('# ', '')}</h1>;
                      }
                      if (paragraph.startsWith('## ')) {
                        return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
                      }
                      if (paragraph.startsWith('- **')) {
                        const match = paragraph.match(/- \*\*(.+?)\*\*: (.+)/);
                        if (match) {
                          return (
                            <div key={index} className="flex gap-2 mb-2">
                              <span className="text-primary">•</span>
                              <span><strong>{match[1]}:</strong> {match[2]}</span>
                            </div>
                          );
                        }
                      }
                      if (paragraph.startsWith('- ')) {
                        return (
                          <div key={index} className="flex gap-2 mb-2">
                            <span className="text-primary">•</span>
                            <span>{paragraph.replace('- ', '')}</span>
                          </div>
                        );
                      }
                      if (paragraph.match(/^\d+\./)) {
                        return <p key={index} className="mb-2 ml-4">{paragraph}</p>;
                      }
                      if (paragraph.trim()) {
                        return <p key={index} className="mb-4 text-muted-foreground">{paragraph}</p>;
                      }
                      return null;
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Mark as Complete & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Button
                  onClick={() => setIsCompleted(!isCompleted)}
                  variant={isCompleted ? "outline" : "default"}
                  className="w-full sm:w-auto gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                </Button>

                <div className="flex gap-3 w-full sm:w-auto">
                  {prevLesson ? (
                    <Link to={`/courses/${course.id}/lesson/${prevLesson.id}`} className="flex-1 sm:flex-none">
                      <Button variant="outline" className="w-full gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" disabled className="flex-1 sm:flex-none gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </Button>
                  )}

                  {nextLesson ? (
                    <Link to={`/courses/${course.id}/lesson/${nextLesson.id}`} className="flex-1 sm:flex-none">
                      <Button className="w-full gap-2">
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`/courses/${course.id}`} className="flex-1 sm:flex-none">
                      <Button className="w-full gap-2">
                        Finish Course
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Security Tips */}
              <div className="sticky top-24 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <SecurityTip tips={lesson.tips} />

                {/* Course Navigation */}
                <Card className="mt-6">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">Lesson Navigation</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {allLessons.map((l, index) => (
                        <Link
                          key={l.id}
                          to={`/courses/${course.id}/lesson/${l.id}`}
                          className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                            l.id === lesson.id
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-secondary"
                          }`}
                        >
                          <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm line-clamp-1">{l.title}</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lesson;
