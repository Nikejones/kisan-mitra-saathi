import { useState } from "react";
import { User, MapPin, Sprout, Calendar, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FarmerProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "राम सिंह (Ram Singh)",
    phone: "+91 98765 43210",
    location: "Village Rampur, District Meerut, UP",
    farmSize: "5.2",
    soilType: "alluvial",
    cropPreference: "wheat-rice",
    experience: "15",
    irrigation: "tube-well",
    pastYield: "35"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your farmer profile has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Farmer Profile</h2>
          <p className="text-muted-foreground">किसान प्रोफाइल - Manage your farming details</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="gradient-success">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-primary rounded-lg">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic details and contact information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name / नाम</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number / मोबाइल नंबर</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Location / स्थान</Label>
              <Textarea
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Farm Information */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-earth rounded-lg">
                <Sprout className="h-6 w-6 text-earth-brown" />
              </div>
              <div>
                <CardTitle>Farm Details</CardTitle>
                <CardDescription>Land and farming specifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="farmSize">Farm Size (Acres) / खेत का आकार</Label>
              <Input
                id="farmSize"
                value={profile.farmSize}
                onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
                type="number"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="soilType">Soil Type / मिट्टी का प्रकार</Label>
              <Select 
                value={profile.soilType} 
                onValueChange={(value) => setProfile({ ...profile, soilType: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alluvial">Alluvial / जलोढ़</SelectItem>
                  <SelectItem value="black">Black Cotton / काली मिट्टी</SelectItem>
                  <SelectItem value="red">Red Soil / लाल मिट्टी</SelectItem>
                  <SelectItem value="laterite">Laterite / लेटराइट</SelectItem>
                  <SelectItem value="sandy">Sandy / रेतीली</SelectItem>
                  <SelectItem value="clay">Clay / चिकनी</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="irrigation">Irrigation Method / सिंचाई की विधि</Label>
              <Select 
                value={profile.irrigation} 
                onValueChange={(value) => setProfile({ ...profile, irrigation: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tube-well">Tube Well / नलकूप</SelectItem>
                  <SelectItem value="canal">Canal / नहर</SelectItem>
                  <SelectItem value="river">River / नदी</SelectItem>
                  <SelectItem value="rainwater">Rainwater / वर्षा जल</SelectItem>
                  <SelectItem value="drip">Drip Irrigation / ड्रिप सिंचाई</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Farming Experience */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-success rounded-lg">
                <Calendar className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <CardTitle>Farming Experience</CardTitle>
                <CardDescription>Your agricultural background</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="experience">Years of Experience / अनुभव (वर्ष)</Label>
              <Input
                id="experience"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="cropPreference">Preferred Crops / मुख्य फसल</Label>
              <Select 
                value={profile.cropPreference} 
                onValueChange={(value) => setProfile({ ...profile, cropPreference: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat-rice">Wheat & Rice / गेहूं और चावल</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane / गन्ना</SelectItem>
                  <SelectItem value="cotton">Cotton / कपास</SelectItem>
                  <SelectItem value="vegetables">Vegetables / सब्जी</SelectItem>
                  <SelectItem value="pulses">Pulses / दलहन</SelectItem>
                  <SelectItem value="oilseeds">Oilseeds / तिलहन</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="pastYield">Average Yield (Quintal/Acre) / औसत उत्पादन</Label>
              <Input
                id="pastYield"
                value={profile.pastYield}
                onChange={(e) => setProfile({ ...profile, pastYield: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
                type="number"
              />
            </div>
          </CardContent>
        </Card>

        {/* Farm Statistics */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning rounded-lg">
                <MapPin className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <CardTitle>Farm Statistics</CardTitle>
                <CardDescription>Key farming metrics / मुख्य कृषि आंकड़े</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isEditing ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <div className="text-2xl font-bold text-primary">{profile.farmSize}</div>
                    <div className="text-sm text-muted-foreground">Total Acres</div>
                  </div>
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <div className="text-2xl font-bold text-success">{profile.experience}</div>
                    <div className="text-sm text-muted-foreground">Years Exp.</div>
                  </div>
                </div>
                <div className="text-center p-3 bg-accent rounded-lg">
                  <div className="text-2xl font-bold text-crop-yellow">{profile.pastYield}</div>
                  <div className="text-sm text-muted-foreground">Avg. Yield (Q/Acre)</div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Note: Statistics are calculated from your farm details above
                  नोट: आंकड़े आपके ऊपर दिए गए खेत विवरण से गणना की गई है
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-accent rounded-lg border-2 border-dashed border-muted">
                    <div className="text-2xl font-bold text-primary">{profile.farmSize}</div>
                    <div className="text-sm text-muted-foreground">Total Acres (Auto)</div>
                  </div>
                  <div className="text-center p-3 bg-accent rounded-lg border-2 border-dashed border-muted">
                    <div className="text-2xl font-bold text-success">{profile.experience}</div>
                    <div className="text-sm text-muted-foreground">Years Exp. (Auto)</div>
                  </div>
                </div>
                <div className="text-center p-3 bg-accent rounded-lg border-2 border-dashed border-muted">
                  <div className="text-2xl font-bold text-crop-yellow">{profile.pastYield}</div>
                  <div className="text-sm text-muted-foreground">Avg. Yield (Auto)</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerProfile;