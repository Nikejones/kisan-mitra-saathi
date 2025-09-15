import { useState } from "react";
import { Sprout, Droplets, Bug, Scissors, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface CropStage {
  name: string;
  hindi_name: string;
  duration: string;
  description: string;
  tasks: string[];
  fertilizer: string[];
  irrigation: string;
  pest_watch: string[];
}

const CropAdvisory = () => {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [currentStage, setCurrentStage] = useState(2);

  const crops = {
    wheat: {
      name: "Wheat",
      hindi_name: "गेहूं",
      season: "Rabi (Oct - Apr)",
      stages: [
        {
          name: "Land Preparation",
          hindi_name: "भूमि तैयारी",
          duration: "15-20 days before sowing",
          description: "Prepare field for optimal seed germination",
          tasks: [
            "Deep ploughing with tractor/bullocks",
            "Remove crop residues and weeds", 
            "Level the field properly",
            "Apply organic manure (FYM)"
          ],
          fertilizer: ["10-15 tonnes FYM per hectare"],
          irrigation: "Pre-sowing irrigation if required",
          pest_watch: ["Termites in organic matter"]
        },
        {
          name: "Sowing Stage", 
          hindi_name: "बुवाई",
          duration: "Nov 15 - Dec 15",
          description: "Critical stage for proper establishment",
          tasks: [
            "Select quality certified seeds",
            "Seed treatment with fungicide",
            "Maintain proper row spacing (20cm)",
            "Ensure uniform seed depth (3-5cm)"
          ],
          fertilizer: ["60 kg Nitrogen", "40 kg Phosphorus", "30 kg Potash"],
          irrigation: "Light irrigation after sowing",
          pest_watch: ["Birds", "Rodents", "Cutworms"]
        },
        {
          name: "Vegetative Growth",
          hindi_name: "वानस्पतिक विकास", 
          duration: "30-45 days after sowing",
          description: "Plant establishment and tillering phase",
          tasks: [
            "First weeding and hoeing",
            "Monitor plant population",
            "Apply first nitrogen dose",
            "Check for pest and diseases"
          ],
          fertilizer: ["30 kg Nitrogen as top dressing"],
          irrigation: "2-3 irrigations as per soil moisture",
          pest_watch: ["Aphids", "Leaf rust", "Yellow rust"]
        },
        {
          name: "Flowering Stage",
          hindi_name: "फूल आना",
          duration: "75-85 days after sowing", 
          description: "Critical stage determining yield",
          tasks: [
            "Ensure adequate moisture",
            "Apply second nitrogen dose",
            "Monitor for diseases",
            "Protect from extreme weather"
          ],
          fertilizer: ["30 kg Nitrogen (remaining dose)"],
          irrigation: "Critical irrigation required", 
          pest_watch: ["Brown rust", "Loose smut", "Karnal bunt"]
        },
        {
          name: "Grain Formation",
          hindi_name: "दाना भरना",
          duration: "85-110 days after sowing",
          description: "Grain filling and weight determination", 
          tasks: [
            "Maintain soil moisture",
            "Watch for lodging",
            "Spray for late season pests",
            "Plan harvesting logistics"
          ],
          fertilizer: ["Foliar spray of micronutrients"],
          irrigation: "Light irrigation if needed",
          pest_watch: ["Stem borer", "Head scab", "Storage pests"]
        },
        {
          name: "Maturity & Harvest",
          hindi_name: "पकना और कटाई", 
          duration: "110-130 days after sowing",
          description: "Harvest at proper maturity",
          tasks: [
            "Check grain moisture (12-14%)",
            "Harvest on clear weather",
            "Proper drying and storage",
            "Plan for next crop"
          ],
          fertilizer: [],
          irrigation: "Stop 10 days before harvest",
          pest_watch: ["Storage insects", "Rodents"]
        }
      ]
    },
    rice: {
      name: "Rice", 
      hindi_name: "चावल",
      season: "Kharif (Jun - Nov)",
      stages: [
        {
          name: "Nursery Preparation",
          hindi_name: "पौधशाला तैयारी",
          duration: "25-30 days before transplanting",
          description: "Prepare healthy seedlings",
          tasks: [
            "Select high-quality seeds",
            "Prepare nursery beds", 
            "Seed treatment and sowing",
            "Maintain proper water level"
          ],
          fertilizer: ["Well-decomposed FYM"],
          irrigation: "Maintain 2-5 cm water level",
          pest_watch: ["Damping off", "Stem borer"]
        }
        // Additional rice stages would be added here
      ]
    }
  };

  const getCurrentCrop = () => crops[selectedCrop as keyof typeof crops];
  const crop = getCurrentCrop();

  const getStageProgress = () => {
    return ((currentStage + 1) / crop.stages.length) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Crop Advisory</h2>
          <p className="text-muted-foreground">फसल सलाह - Personalized recommendations for your crops</p>
        </div>
      </div>

      {/* Crop Selection */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Select Your Crop</CardTitle>
          <CardDescription>Choose the crop for detailed guidance • अपनी फसल चुनें</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Crop Type / फसल का प्रकार</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">Wheat / गेहूं</SelectItem>
                  <SelectItem value="rice">Rice / चावल</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane / गन्ना</SelectItem>
                  <SelectItem value="cotton">Cotton / कपास</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Current Stage / वर्तमान अवस्था</label>
              <Select value={currentStage.toString()} onValueChange={(value) => setCurrentStage(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {crop.stages.map((stage, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {stage.name} / {stage.hindi_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Progress */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{crop.name} Cultivation Progress</CardTitle>
              <CardDescription>{crop.hindi_name} • {crop.season}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{Math.round(getStageProgress())}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={getStageProgress()} className="mb-4" />
          <div className="flex items-center justify-between text-sm">
            <span>Stage {currentStage + 1} of {crop.stages.length}</span>
            <Badge variant="outline">{crop.stages[currentStage].duration}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Current Stage Details */}
      <Card className="shadow-card border-primary">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-primary rounded-lg">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">
                Current Stage: {crop.stages[currentStage].name}
              </CardTitle>
              <CardDescription className="text-base font-medium">
                वर्तमान अवस्था: {crop.stages[currentStage].hindi_name}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-4">
              {crop.stages[currentStage].description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Tasks */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <h4 className="font-semibold">Key Tasks / मुख्य कार्य</h4>
              </div>
              <ul className="space-y-2">
                {crop.stages[currentStage].tasks.map((task, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fertilizer */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-success" />
                <h4 className="font-semibold">Fertilizer / उर्वरक</h4>
              </div>
              {crop.stages[currentStage].fertilizer.length > 0 ? (
                <ul className="space-y-2">
                  {crop.stages[currentStage].fertilizer.map((fertilizer, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="h-2 w-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                      <span>{fertilizer}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No fertilizer required at this stage</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Irrigation */}
            <div className="p-4 bg-water-blue/10 border border-water-blue/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-water-blue" />
                <h4 className="font-semibold text-water-blue">Irrigation / सिंचाई</h4>
              </div>
              <p className="text-sm text-water-blue/80">
                {crop.stages[currentStage].irrigation}
              </p>
            </div>

            {/* Pest Watch */}
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="h-5 w-5 text-warning" />
                <h4 className="font-semibold text-warning">Pest Watch / कीट निगरानी</h4>
              </div>
              <div className="space-y-1">
                {crop.stages[currentStage].pest_watch.map((pest, index) => (
                  <div key={index} className="text-sm text-warning/80">• {pest}</div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stage Timeline */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Cultivation Timeline</CardTitle>
          <CardDescription>Complete growth stages overview • फसल की सभी अवस्थाएं</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crop.stages.map((stage, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-4 p-4 rounded-lg transition-smooth ${
                  index === currentStage 
                    ? 'bg-primary/10 border border-primary/20' 
                    : index < currentStage 
                      ? 'bg-success/5 border border-success/10'
                      : 'bg-muted/30'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  index === currentStage 
                    ? 'bg-primary text-primary-foreground' 
                    : index < currentStage 
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStage ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : index === currentStage ? (
                    <Calendar className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold ${
                      index === currentStage ? 'text-primary' : 
                      index < currentStage ? 'text-success' : 'text-foreground'
                    }`}>
                      {stage.name}
                    </h4>
                    {index === currentStage && (
                      <Badge variant="default">Current</Badge>
                    )}
                    {index < currentStage && (
                      <Badge variant="outline" className="text-success border-success">Completed</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{stage.hindi_name}</p>
                  <p className="text-sm">{stage.description}</p>
                  <div className="text-xs text-muted-foreground mt-2">{stage.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Action Alert */}
      <Alert className="border-primary bg-primary/10">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">Next Action Required</AlertTitle>
        <AlertDescription>
          {currentStage < crop.stages.length - 1 ? (
            <>
              Prepare for <strong>{crop.stages[currentStage + 1].name}</strong> stage. 
              Expected duration: {crop.stages[currentStage + 1].duration}
            </>
          ) : (
            "Congratulations! You've reached the final stage. Prepare for harvest!"
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CropAdvisory;