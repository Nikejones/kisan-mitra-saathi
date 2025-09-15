import { useState } from "react";
import { ArrowLeft, User, Sprout, CloudSun, TrendingUp, Camera, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FarmerProfile from "./FarmerProfile";
import WeatherWidget from "./WeatherWidget";
import MarketPrices from "./MarketPrices";
import CropAdvisory from "./CropAdvisory";
import PestDetection from "./PestDetection";

interface FarmerDashboardProps {
  onBack: () => void;
}

const FarmerDashboard = ({ onBack }: FarmerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 gradient-primary rounded-lg">
                  <Sprout className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Farmer Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Welcome, किसान जी</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-2">
              <CloudSun className="h-4 w-4" />
              <span className="hidden sm:inline">Weather</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Market</span>
            </TabsTrigger>
            <TabsTrigger value="advisory" className="flex items-center gap-2">
              <Sprout className="h-4 w-4" />
              <span className="hidden sm:inline">Advisory</span>
            </TabsTrigger>
            <TabsTrigger value="pest" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Pest Check</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Land</CardTitle>
                  <Sprout className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">5.2 Acres</div>
                  <p className="text-xs text-muted-foreground">Registered farmland</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Season</CardTitle>
                  <CloudSun className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">Rabi</div>
                  <p className="text-xs text-muted-foreground">Winter crops</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
                  <Sprout className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-crop-yellow">3 Types</div>
                  <p className="text-xs text-muted-foreground">Wheat, Mustard, Peas</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                  <Bell className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">2 New</div>
                  <p className="text-xs text-muted-foreground">Weather & market</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="shadow-card hover:shadow-lg transition-smooth cursor-pointer" onClick={() => setActiveTab("weather")}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 gradient-sky rounded-lg">
                      <CloudSun className="h-6 w-6 text-sky-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Weather Update</CardTitle>
                      <CardDescription>Check today's forecast</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sunny, 28°C • Light rain expected tomorrow
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-lg transition-smooth cursor-pointer" onClick={() => setActiveTab("market")}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 gradient-success rounded-lg">
                      <TrendingUp className="h-6 w-6 text-success-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Market Prices</CardTitle>
                      <CardDescription>Latest mandi rates</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Wheat: ₹2,150/quintal • Trending up ↗
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-lg transition-smooth cursor-pointer" onClick={() => setActiveTab("pest")}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 gradient-primary rounded-lg">
                      <Camera className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Pest Detection</CardTitle>
                      <CardDescription>Scan your crops</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Take a photo to identify pests and diseases
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <FarmerProfile />
          </TabsContent>

          <TabsContent value="weather">
            <WeatherWidget />
          </TabsContent>

          <TabsContent value="market">
            <MarketPrices />
          </TabsContent>

          <TabsContent value="advisory">
            <CropAdvisory />
          </TabsContent>

          <TabsContent value="pest">
            <PestDetection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerDashboard;