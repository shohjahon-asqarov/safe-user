import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { securityQuestions, getSecurityLevel, SecurityQuestion } from "@/data/securityCheck";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  ChevronLeft, 
  Shield, 
  ShieldAlert, 
  ShieldCheck,
  RefreshCw,
  BookOpen,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

type CheckState = 'intro' | 'in-progress' | 'result';

const levelConfig = {
  low: {
    icon: ShieldAlert,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive',
  },
  medium: {
    icon: Shield,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning',
  },
  high: {
    icon: ShieldCheck,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success',
  },
};

const SelfCheck = () => {
  const [state, setState] = useState<CheckState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(securityQuestions.length).fill(null)
  );

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const goToNext = () => {
    if (currentQuestion < securityQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setState('result');
    }
  };

  const goToPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let total = 0;
    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        total += securityQuestions[questionIndex].options[answerIndex].score;
      }
    });
    return total;
  };

  const resetCheck = () => {
    setState('intro');
    setCurrentQuestion(0);
    setAnswers(new Array(securityQuestions.length).fill(null));
  };

  const score = calculateScore();
  const securityLevel = getSecurityLevel(score);
  const config = levelConfig[securityLevel.level];
  const LevelIcon = config.icon;
  const currentQ = securityQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / securityQuestions.length) * 100;

  return (
    <Layout>
      {/* Intro State */}
      {state === 'intro' && (
        <section className="py-20 lg:py-28">
          <div className="section-container max-w-2xl">
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Security Self-Check
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Answer a few questions about your digital habits to discover 
                your current security level and get personalized recommendations.
              </p>

              <Card className="mb-8 text-left">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">What to expect:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span>{securityQuestions.length} questions about your security practices</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span>Takes about 2-3 minutes to complete</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span>Get your security level: Low, Medium, or High</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span>Receive personalized improvement recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Button size="lg" onClick={() => setState('in-progress')} className="gap-2">
                Start Self-Check
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* In Progress State */}
      {state === 'in-progress' && (
        <section className="py-12 lg:py-16">
          <div className="section-container max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-xl font-bold mb-2">Security Self-Check</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {securityQuestions.length}
              </p>
            </div>

            {/* Progress */}
            <ProgressBar value={progress} className="mb-8" />

            {/* Question Card */}
            <Card className="mb-8 animate-fade-in">
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        answers[currentQuestion] === index
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion] === index
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/30'
                        }`}>
                          {answers[currentQuestion] === index && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goToPrev}
                disabled={currentQuestion === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button
                onClick={goToNext}
                disabled={answers[currentQuestion] === null}
                className="gap-2"
              >
                {currentQuestion === securityQuestions.length - 1 ? "See Results" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Result State */}
      {state === 'result' && (
        <section className="py-16 lg:py-20">
          <div className="section-container max-w-2xl">
            <div className="text-center animate-fade-in">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${config.bgColor}`}>
                <LevelIcon className={`w-12 h-12 ${config.color}`} />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {securityLevel.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your Security Level: <span className={`font-semibold ${config.color}`}>
                  {securityLevel.level.charAt(0).toUpperCase() + securityLevel.level.slice(1)}
                </span>
              </p>

              <Card className={`mb-8 border-l-4 ${config.borderColor}`}>
                <CardContent className="p-6 text-left">
                  <p className="text-muted-foreground">
                    {securityLevel.description}
                  </p>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="mb-8">
                <CardContent className="p-6 text-left">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    Recommendations for You
                  </h3>
                  <ul className="space-y-3">
                    {securityLevel.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={resetCheck} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Take Again
                </Button>
                <Link to="/courses">
                  <Button className="gap-2 w-full sm:w-auto">
                    <BookOpen className="w-4 h-4" />
                    Start Learning
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default SelfCheck;
