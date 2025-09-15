import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, RefreshCw, MapPin, Calendar, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface MarketPrice {
  commodity: string;
  hindi_name: string;
  market: string;
  state: string;
  price: number;
  unit: string;
  date: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  min_price: number;
  max_price: number;
}

const MarketPrices = () => {
  const { toast } = useToast();
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("uttar-pradesh");
  const [selectedCommodity, setSelectedCommodity] = useState("all");

  // Mock data for demonstration - In production, this would fetch from government APIs
  const mockPrices: MarketPrice[] = [
    {
      commodity: "Wheat",
      hindi_name: "गेहूं",
      market: "Meerut",
      state: "Uttar Pradesh",
      price: 2150,
      unit: "Quintal",
      date: "2024-01-15",
      change: 2.3,
      trend: 'up',
      min_price: 2000,
      max_price: 2200
    },
    {
      commodity: "Rice",
      hindi_name: "चावल",
      market: "Saharanpur", 
      state: "Uttar Pradesh",
      price: 3200,
      unit: "Quintal",
      date: "2024-01-15",
      change: -1.5,
      trend: 'down',
      min_price: 3000,
      max_price: 3400
    },
    {
      commodity: "Sugarcane",
      hindi_name: "गन्ना",
      market: "Muzaffarnagar",
      state: "Uttar Pradesh", 
      price: 350,
      unit: "Quintal",
      date: "2024-01-15",
      change: 0.8,
      trend: 'up',
      min_price: 340,
      max_price: 360
    },
    {
      commodity: "Cotton",
      hindi_name: "कपास",
      market: "Agra",
      state: "Uttar Pradesh",
      price: 6800,
      unit: "Quintal", 
      date: "2024-01-15",
      change: -2.1,
      trend: 'down',
      min_price: 6500,
      max_price: 7200
    },
    {
      commodity: "Mustard",
      hindi_name: "सरसों",
      market: "Mathura",
      state: "Uttar Pradesh",
      price: 5200,
      unit: "Quintal",
      date: "2024-01-15", 
      change: 3.2,
      trend: 'up',
      min_price: 4800,
      max_price: 5400
    },
    {
      commodity: "Peas",
      hindi_name: "मटर",
      market: "Ghaziabad",
      state: "Uttar Pradesh",
      price: 4500,
      unit: "Quintal",
      date: "2024-01-15",
      change: 1.8,
      trend: 'up', 
      min_price: 4200,
      max_price: 4800
    }
  ];

  const fetchMarketPrices = async () => {
    setLoading(true);
    try {
      // Simulate API call - In production, integrate with:
      // 1. Agmarknet API (https://agmarknet.gov.in/)
      // 2. eNAM API for real-time mandi prices
      // 3. State agriculture department APIs
      
      setTimeout(() => {
        let filteredPrices = mockPrices;
        
        if (selectedCommodity !== "all") {
          filteredPrices = mockPrices.filter(p => 
            p.commodity.toLowerCase() === selectedCommodity
          );
        }
        
        setPrices(filteredPrices);
        setLoading(false);
        
        toast({
          title: "Market Prices Updated",
          description: "Latest mandi prices have been fetched successfully.",
        });
      }, 1000);

      /* Production API integration example:
      const response = await axios.get(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state]=${selectedState}`
      );
      setPrices(response.data.records);
      */
      
    } catch (error) {
      console.error('Market price fetch error:', error);
      toast({
        title: "Update Failed", 
        description: "Unable to fetch market prices. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketPrices();
  }, [selectedState, selectedCommodity]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <div className="h-4 w-4 bg-muted rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down': 
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Market Prices</h2>
          <p className="text-muted-foreground">मंडी भाव - Live mandi rates and market trends</p>
        </div>
        <Button onClick={fetchMarketPrices} disabled={loading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Prices
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Filter Markets</CardTitle>
          <CardDescription>Select state and commodity for specific prices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">State / राज्य</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uttar-pradesh">Uttar Pradesh / उत्तर प्रदेश</SelectItem>
                  <SelectItem value="punjab">Punjab / पंजाब</SelectItem>
                  <SelectItem value="haryana">Haryana / हरियाणा</SelectItem>
                  <SelectItem value="bihar">Bihar / बिहार</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra / महाराष्ट्र</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Commodity / फसल</label>
              <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Commodities / सभी फसलें</SelectItem>
                  <SelectItem value="wheat">Wheat / गेहूं</SelectItem>
                  <SelectItem value="rice">Rice / चावल</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane / गन्ना</SelectItem>
                  <SelectItem value="cotton">Cotton / कपास</SelectItem>
                  <SelectItem value="mustard">Mustard / सरसों</SelectItem>
                  <SelectItem value="peas">Peas / मटर</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prices.map((price, index) => (
          <Card key={index} className="shadow-card hover:shadow-lg transition-smooth">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {price.commodity}
                    {getTrendIcon(price.trend)}
                  </CardTitle>
                  <CardDescription className="text-base font-medium">
                    {price.hindi_name}
                  </CardDescription>
                </div>
                <Badge variant={price.trend === 'up' ? 'default' : 'destructive'}>
                  {price.trend === 'up' ? '+' : ''}{price.change}%
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary">
                  <IndianRupee className="h-6 w-6" />
                  {price.price.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">per {price.unit}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{price.market}, {price.state}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(price.date).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Min: </span>
                  <span className="font-medium">₹{price.min_price}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Max: </span>
                  <span className="font-medium">₹{price.max_price}</span>
                </div>
              </div>
              
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="gradient-success h-2 rounded-full transition-smooth"
                  style={{ 
                    width: `${((price.price - price.min_price) / (price.max_price - price.min_price)) * 100}%` 
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading && (
        <Card className="shadow-card">
          <CardContent className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Loading market prices...</span>
          </CardContent>
        </Card>
      )}

      {/* Market Analysis */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-success rounded-lg">
              <TrendingUp className="h-6 w-6 text-success-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">Market Analysis</CardTitle>
              <CardDescription>Trends and recommendations • बाजार विश्लेषण</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="font-semibold text-success mb-2">📈 Rising Prices</div>
              <ul className="text-sm space-y-1 text-success/80">
                <li>• Wheat prices up 2.3% - good time to sell</li>
                <li>• Mustard showing strong demand</li>
                <li>• गेहूं का भाव बढ़ रहा है - बेचने का अच्छा समय</li>
              </ul>
            </div>
            
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="font-semibold text-warning mb-2">💡 Selling Tips</div>
              <ul className="text-sm space-y-1 text-warning/80">
                <li>• Best markets: Meerut, Saharanpur</li>
                <li>• Avoid selling on rainy days</li>
                <li>• बारिश के दिन बेचने से बचें</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketPrices;