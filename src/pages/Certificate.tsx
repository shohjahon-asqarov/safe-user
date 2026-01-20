import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Download, Share2, Shield, Calendar, CheckCircle2 } from "lucide-react";

const Certificate = () => {
  const [name, setName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const generateCertificate = () => {
    if (name.trim()) {
      setShowCertificate(true);
    }
  };

  const handleDownload = () => {
    // Fake download - in a real app, this would generate a PDF
    alert("Download feature would generate a PDF certificate in a production app!");
  };

  const handleShare = () => {
    // Fake share - in a real app, this would open sharing options
    alert("Share feature would allow sharing on social media in a production app!");
  };

  return (
    <Layout>
      <section className="py-16 lg:py-20">
        <div className="section-container">
          {!showCertificate ? (
            <div className="max-w-xl mx-auto text-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Generate Your Certificate
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Congratulations on completing your cyber security training! 
                Enter your name below to generate your certificate.
              </p>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-left">
                      <Label htmlFor="name">Your Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name as it should appear on the certificate"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <Button
                      onClick={generateCertificate}
                      disabled={!name.trim()}
                      className="w-full gap-2"
                    >
                      <Award className="w-4 h-4" />
                      Generate Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button variant="outline" onClick={() => setShowCertificate(false)}>
                  Edit Name
                </Button>
                <Button onClick={handleDownload} className="gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button variant="secondary" onClick={handleShare} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>

              {/* Certificate Preview */}
              <div 
                ref={certificateRef}
                className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-8 border-primary/10"
              >
                {/* Certificate Design */}
                <div className="relative p-8 md:p-12 lg:p-16">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full" 
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>

                  {/* Border Design */}
                  <div className="absolute inset-4 border-2 border-primary/20 rounded-xl pointer-events-none" />
                  <div className="absolute inset-6 border border-primary/10 rounded-lg pointer-events-none" />

                  {/* Content */}
                  <div className="relative text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                        <Shield className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <span className="text-2xl font-bold text-foreground">SafeUser</span>
                    </div>

                    {/* Title */}
                    <div className="mb-8">
                      <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2">
                        Certificate of Completion
                      </h2>
                      <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto" />
                    </div>

                    {/* This certifies */}
                    <p className="text-muted-foreground mb-4">
                      This is to certify that
                    </p>

                    {/* Name */}
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                      {name}
                    </h1>

                    {/* Underline */}
                    <div className="h-px w-64 bg-border mx-auto mb-8" />

                    {/* Achievement */}
                    <p className="text-muted-foreground mb-2">
                      has successfully completed the
                    </p>
                    <h3 className="text-xl font-semibold mb-2">
                      Cyber Security Awareness Training
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      and demonstrated proficiency in protecting digital assets and personal information
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {['Password Security', 'Phishing Prevention', 'Online Privacy', 'Safe Browsing'].map((skill) => (
                        <span
                          key={skill}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-sm"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Date & ID */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Issued: {currentDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Certificate ID: </span>
                        <span className="font-mono">SU-{Date.now().toString(36).toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Seal */}
                    <div className="mt-8 flex justify-center">
                      <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
                          <div className="text-center">
                            <Award className="w-6 h-6 text-primary mx-auto mb-1" />
                            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                              Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                This is a sample certificate for demonstration purposes.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Certificate;
