import { useState, useEffect } from "react";
import { CloudSun, Droplets, Wind, Eye, Thermometer, AlertTriangle, RefreshCw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    visibility: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    pop: number;
  }>;
}

const WeatherWidget = () => {
  const { toast } = useToast();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("Meerut, UP");
  
  const indianCities = [
    "Meerut, UP", "Delhi", "Mumbai, Maharashtra", "Kolkata, West Bengal", 
    "Chennai, Tamil Nadu", "Bangalore, Karnataka", "Hyderabad, Telangana",
    "Pune, Maharashtra", "Ahmedabad, Gujarat", "Jaipur, Rajasthan",
    "Lucknow, UP", "Kanpur, UP", "Agra, UP", "Varanasi, UP",
    "Patna, Bihar", "Indore, MP", "Bhopal, MP", "Ludhiana, Punjab",
    "Coimbatore, Tamil Nadu", "Kochi, Kerala", "Visakhapatnam, AP"
  ];

  // OpenWeatherMap API key - In production, this should be in environment variables
  const API_KEY = "your_openweather_api_key"; // Replace with actual API key

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // For demo purposes, using mock data since API key needs to be configured
      // In production, uncomment the actual API call below
      
      setTimeout(() => {
        setWeather({
          current: {
            temp: 28,
            feels_like: 32,
            humidity: 65,
            wind_speed: 3.2,
            visibility: 8000,
            weather: [{
              main: "Clear",
              description: "clear sky",
              icon: "01d"
            }]
          },
          daily: [
            {
              dt: Date.now(),
              temp: { min: 18, max: 30 },
              weather: [{ main: "Clear", description: "sunny", icon: "01d" }],
              pop: 0.1
            },
            {
              dt: Date.now() + 86400000,
              temp: { min: 20, max: 28 },
              weather: [{ main: "Clouds", description: "partly cloudy", icon: "02d" }],
              pop: 0.3
            },
            {
              dt: Date.now() + 172800000,
              temp: { min: 19, max: 26 },
              weather: [{ main: "Rain", description: "light rain", icon: "10d" }],
              pop: 0.8
            }
          ]
        });
        setLoading(false);
      }, 1000);

      /* Actual API call for production:
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=28.9845&lon=77.7064&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      */
      
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast({
        title: "Weather Update Failed",
        description: "Unable to fetch weather data. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (iconCode: string) => {
    return <CloudSun className="h-8 w-8 text-sky-blue" />;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Weather Intelligence</h2>
          <p className="text-muted-foreground">मौसम जानकारी - Real-time weather updates for {location}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-48">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              {indianCities.map((city) => (
                <SelectItem key={city} value={city} className="cursor-pointer hover:bg-accent">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={fetchWeather} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Weather Alerts */}
      <Alert className="border-warning bg-warning/10">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertTitle className="text-warning">Weather Alert</AlertTitle>
        <AlertDescription>
          Light rain expected tomorrow. Consider protecting crops and plan irrigation accordingly.
          कल हल्की बारिश की संभावना है।
        </AlertDescription>
      </Alert>

      {weather && (
        <>
          {/* Current Weather */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Current Weather</CardTitle>
                  <CardDescription>{location} • वर्तमान मौसम</CardDescription>
                </div>
                {getWeatherIcon(weather.current.weather[0].icon)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{Math.round(weather.current.temp)}°C</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {weather.current.weather[0].description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Feels like {Math.round(weather.current.feels_like)}°C
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-water-blue" />
                    <span className="text-sm">Humidity: {weather.current.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Wind: {weather.current.wind_speed} km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Visibility: {weather.current.visibility/1000} km</span>
                  </div>
                </div>

                <div className="gradient-sky p-4 rounded-lg text-center">
                  <Thermometer className="h-8 w-8 text-sky-blue mx-auto mb-2" />
                  <div className="text-lg font-semibold text-sky-blue">Perfect for</div>
                  <div className="text-sm text-sky-blue/80">Field inspection & spraying</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7-Day Forecast */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">7-Day Forecast</CardTitle>
              <CardDescription>Weekly weather outlook • साप्ताहिक मौसम पूर्वानुमान</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {weather.daily.slice(0, 7).map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-3">
                      {getWeatherIcon(day.weather[0].icon)}
                      <div>
                        <div className="font-medium">
                          {index === 0 ? 'Today' : formatDate(day.dt)}
                        </div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {day.weather[0].description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
                      </div>
                      <div className="text-sm text-water-blue">
                        {Math.round(day.pop * 100)}% rain
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Farming Recommendations */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 gradient-success rounded-lg">
                  <CloudSun className="h-6 w-6 text-success-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl">Farming Recommendations</CardTitle>
                  <CardDescription>AI-based suggestions • कृषि सुझाव</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="font-semibold text-success mb-2">✓ Ideal Conditions Today</div>
                  <ul className="text-sm space-y-1 text-success/80">
                    <li>• Perfect weather for field inspection</li>
                    <li>• Good time for fertilizer application</li>
                    <li>• आज खेत का निरीक्षण करने का अच्छा समय है</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="font-semibold text-warning mb-2">⚠ Tomorrow's Precautions</div>
                  <ul className="text-sm space-y-1 text-warning/80">
                    <li>• Rain expected - avoid spraying pesticides</li>
                    <li>• Ensure proper drainage in fields</li>
                    <li>• कल बारिश की वजह से छिड़काव न करें</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="font-semibold text-primary mb-2">📅 Week Ahead Planning</div>
                  <ul className="text-sm space-y-1 text-primary/80">
                    <li>• Plan irrigation for day after tomorrow</li>
                    <li>• Good window for harvesting operations</li>
                    <li>• सप्ताह में सिंचाई की योजना बनाएं</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {loading && (
        <Card className="shadow-card">
          <CardContent className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Loading weather data...</span>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherWidget;