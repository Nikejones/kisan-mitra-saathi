import { useState, useRef } from "react";
import { Camera, Upload, Scan, Bug, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DetectionResult {
  pest_name: string;
  hindi_name: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  organic_solutions: string[];
}

const PestDetection = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock AI detection results for demonstration
  const mockDetectionResults: DetectionResult[] = [
    {
      pest_name: "Aphids",
      hindi_name: "माहू",
      confidence: 92,
      severity: "Medium",
      description: "Small, soft-bodied insects that feed on plant sap",
      symptoms: [
        "Curled or distorted leaves",
        "Sticky honeydew on plants",
        "Yellowing of leaves",
        "Stunted growth"
      ],
      treatment: [
        "Spray neem oil solution (5ml per liter)",
        "Use insecticidal soap spray",
        "Apply systemic insecticides if severe",
        "Introduce ladybugs as biological control"
      ],
      prevention: [
        "Regular monitoring of crops",
        "Remove infected plant parts",
        "Maintain proper plant spacing",
        "Avoid over-fertilization with nitrogen"
      ],
      organic_solutions: [
        "Neem oil spray (जैविक नीम तेल)",
        "Garlic and chili pepper spray",
        "Encourage natural predators",
        "Companion planting with marigolds"
      ]
    },
    {
      pest_name: "Leaf Spot Disease",
      hindi_name: "पत्ती धब्बा रोग", 
      confidence: 87,
      severity: "High",
      description: "Fungal disease causing dark spots on leaves",
      symptoms: [
        "Dark brown or black spots on leaves",
        "Yellow halos around spots",
        "Premature leaf drop",
        "Reduced photosynthesis"
      ],
      treatment: [
        "Apply copper-based fungicides",
        "Remove and destroy affected leaves",
        "Improve air circulation",
        "Reduce humidity around plants"
      ],
      prevention: [
        "Avoid overhead watering",
        "Plant disease-resistant varieties",
        "Proper crop rotation",
        "Maintain clean field conditions"
      ],
      organic_solutions: [
        "Baking soda spray (1 tsp per liter)",
        "Trichoderma-based bio-fungicides",
        "Cow urine fermented solution",
        "Maintain soil health with compost"
      ]
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDetectionResults([]);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Image Uploaded",
        description: "Photo uploaded successfully. Click 'Analyze' to detect pests.",
      });
    }
  };

  const handleCameraCapture = () => {
    // In a real implementation, this would open camera
    toast({
      title: "Camera Feature",
      description: "Camera functionality would be available in the mobile app version.",
    });
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setDetectionResults(mockDetectionResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "AI has detected potential pest issues in your crop image.",
      });
    }, 3000);

    /* In production, this would call an actual AI API:
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      
      const response = await fetch('/api/detect-pest', {
        method: 'POST',
        body: formData
      });
      
      const results = await response.json();
      setDetectionResults(results);
    } catch (error) {
      console.error('Detection failed:', error);
    }
    */
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'bg-success text-success-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'High':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pest Detection</h2>
          <p className="text-muted-foreground">कीट पहचान - AI-powered pest and disease identification</p>
        </div>
      </div>

      {/* Image Upload Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Upload Crop Image</CardTitle>
          <CardDescription>
            Take a photo or upload an image of affected crop for AI analysis
            • प्रभावित फसल की तस्वीर लें
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleCameraCapture}
                className="gradient-primary flex-1"
                size="lg"
              >
                <Camera className="h-5 w-5 mr-2" />
                Take Photo / फोटो लें
              </Button>
              
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Image / अपलोड करें
              </Button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {selectedImage && (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded crop" 
                    className="w-full max-w-md mx-auto rounded-lg shadow-card"
                  />
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="gradient-success"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Analyzing... / विश्लेषण हो रहा है
                      </>
                    ) : (
                      <>
                        <Scan className="h-5 w-5 mr-2" />
                        Analyze Image / विश्लेषण करें
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {detectionResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Detection Results / पहचान परिणाम</h3>
          
          {detectionResults.map((result, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bug className="h-5 w-5" />
                      {result.pest_name}
                    </CardTitle>
                    <CardDescription className="text-base font-medium">
                      {result.hindi_name}
                    </CardDescription>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getSeverityColor(result.severity)}>
                      {result.severity} Risk
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {result.confidence}% Confidence
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <p className="text-muted-foreground">{result.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Symptoms */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      <h4 className="font-semibold text-warning">Symptoms / लक्षण</h4>
                    </div>
                    <ul className="space-y-1">
                      {result.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="h-2 w-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <h4 className="font-semibold text-success">Treatment / उपचार</h4>
                    </div>
                    <ul className="space-y-1">
                      {result.treatment.map((treatment, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="h-2 w-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Prevention */}
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold text-primary">Prevention / रोकथाम</h4>
                    </div>
                    <ul className="space-y-1">
                      {result.prevention.map((prevention, idx) => (
                        <li key={idx} className="text-sm text-primary/80">• {prevention}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Organic Solutions */}
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <h4 className="font-semibold text-success">Organic Solutions / जैविक उपाय</h4>
                    </div>
                    <ul className="space-y-1">
                      {result.organic_solutions.map((solution, idx) => (
                        <li key={idx} className="text-sm text-success/80">• {solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tips & Guidelines */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-primary rounded-lg">
              <Camera className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">Photography Tips</CardTitle>
              <CardDescription>Better photos = Better detection • बेहतर तस्वीरों के लिए सुझाव</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-success">✓ Good Practices</h4>
              <ul className="text-sm space-y-1 text-success/80">
                <li>• Take photos in good natural light</li>
                <li>• Focus on affected leaves/parts</li>
                <li>• Capture multiple angles</li>
                <li>• Clean lens before taking photo</li>
                <li>• प्राकृतिक रोशनी में तस्वीर लें</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-destructive">✗ Avoid These</h4>
              <ul className="text-sm space-y-1 text-destructive/80">
                <li>• Blurry or dark images</li>
                <li>• Photos taken from too far</li>
                <li>• Multiple unrelated issues in one photo</li>
                <li>• Photos with poor lighting</li>
                <li>• धुंधली या अंधेरी तस्वीरें न लें</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Alert className="border-destructive bg-destructive/10">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <AlertTitle className="text-destructive">Need Expert Help?</AlertTitle>
        <AlertDescription>
          For severe pest outbreaks, contact your local agriculture extension officer or call our expert helpline: <strong>1800-XXX-XXXX</strong>
          <br />
          गंभीर कीट आक्रमण के लिए स्थानीय कृषि विस्तार अधिकारी से संपर्क करें।
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PestDetection;