import { useState } from "react";
import { Sprout, CloudSun, TrendingUp, Camera, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FarmerDashboard from "@/components/FarmerDashboard";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <FarmerDashboard onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-success/10">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-primary rounded-lg">
              <Sprout className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Kisan Saathi</h1>
              <p className="text-sm text-muted-foreground">स्मार्ट कृषि सलाहकार</p>
            </div>
          </div>
          <Button onClick={() => setShowDashboard(true)} className="gradient-primary">
            डैशबोर्ड खोलें
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block p-4 gradient-success rounded-full mb-6 animate-float">
            <Sprout className="h-16 w-16 text-success-foreground" />
          </div>
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            स्मार्ट कृषि के साथ 
            <span className="text-primary block">अपनी फसल बढ़ाएं</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI-powered crop guidance, real-time weather alerts, market prices, and pest detection 
            - all in your local language for better farming decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowDashboard(true)}
              className="gradient-primary text-lg px-8 py-6"
            >
              शुरू करें - Start Farming Smart
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Watch Demo - डेमो देखें
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-foreground">Complete Farming Solution</h3>
          <p className="text-lg text-muted-foreground">Everything you need for successful farming</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-card hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="p-3 gradient-sky rounded-lg w-fit mb-2">
                <CloudSun className="h-8 w-8 text-sky-blue" />
              </div>
              <CardTitle>Weather Intelligence</CardTitle>
              <CardDescription>
                Real-time weather updates, rainfall predictions, and extreme weather alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Live IMD weather data</li>
                <li>• 7-day accurate forecasts</li>
                <li>• Drought & flood alerts</li>
                <li>• Satellite imagery</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="p-3 gradient-success rounded-lg w-fit mb-2">
                <TrendingUp className="h-8 w-8 text-success-foreground" />
              </div>
              <CardTitle>Market Prices</CardTitle>
              <CardDescription>
                Live mandi prices and market demand tracking for better selling decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Real-time mandi rates</li>
                <li>• Price trend analysis</li>
                <li>• Demand forecasting</li>
                <li>• Best selling locations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="p-3 gradient-primary rounded-lg w-fit mb-2">
                <Camera className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle>Pest Detection</CardTitle>
              <CardDescription>
                AI-powered pest and disease identification through simple photo capture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Instant photo diagnosis</li>
                <li>• Treatment recommendations</li>
                <li>• Prevention strategies</li>
                <li>• Expert consultation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="p-3 gradient-earth rounded-lg w-fit mb-2">
                <Sprout className="h-8 w-8 text-earth-brown" />
              </div>
              <CardTitle>Crop Advisory</CardTitle>
              <CardDescription>
                Personalized recommendations based on soil type, climate, and farming history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Soil-based suggestions</li>
                <li>• Fertilizer planning</li>
                <li>• Crop rotation advice</li>
                <li>• Yield optimization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="p-3 bg-warning rounded-lg w-fit mb-2">
                <Users className="h-8 w-8 text-warning-foreground" />
              </div>
              <CardTitle>Local Language Support</CardTitle>
              <CardDescription>
                Voice and text support in Hindi, English and regional languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Voice commands</li>
                <li>• Hindi interface</li>
                <li>• Regional languages</li>
                <li>• Audio guidance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-lg transition-smooth">
            <CardHeader>
              <div className="p-3 bg-destructive rounded-lg w-fit mb-2">
                <Shield className="h-8 w-8 text-destructive-foreground" />
              </div>
              <CardTitle>Offline Support</CardTitle>
              <CardDescription>
                Works without internet with local data storage and sync capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Offline functionality</li>
                <li>• Local data storage</li>
                <li>• Auto-sync when online</li>
                <li>• SMS alerts backup</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="gradient-primary rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Farming?
          </h3>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who have increased their yields and income with Kisan Saathi
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => setShowDashboard(true)}
            className="text-lg px-8 py-6"
          >
            Start Your Journey - यात्रा शुरू करें
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="text-center text-muted-foreground">
          <p>© 2024 Kisan Saathi - Empowering Indian Farmers with Technology</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;