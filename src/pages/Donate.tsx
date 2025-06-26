
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Heart, CreditCard, Smartphone, DollarSign, Users, BookOpen, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const predefinedAmounts = [
    { amount: "25", impact: "Provides materials for 2 children for a month" },
    { amount: "50", impact: "Sponsors 1 child's complete program participation" },
    { amount: "100", impact: "Funds a full workshop session for 15 children" },
    { amount: "250", impact: "Supports our mental health program for a week" },
    { amount: "500", impact: "Enables us to hire a program instructor for a month" },
    { amount: "1000", impact: "Funds an entire program for 3 months" }
  ];

  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setDonationAmount("custom");
  };

  const getFinalAmount = () => {
    return donationAmount === "custom" ? customAmount : donationAmount;
  };

  const handleDonate = () => {
    const amount = getFinalAmount();
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    if (!donorInfo.name || !donorInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with your payment processor
    console.log("Processing donation:", {
      amount: getFinalAmount(),
      paymentMethod,
      donorInfo
    });

    toast({
      title: "Thank You!",
      description: `Your donation of $${getFinalAmount()} will be processed shortly. You'll receive a confirmation email.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">Make a Difference Today</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Your donation helps us provide free education, life skills training, and mental health support to children who need it most
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800 flex items-center">
                    <Heart className="mr-3 h-6 w-6 text-red-600" />
                    Choose Your Donation Amount
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Predefined Amounts */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Select</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {predefinedAmounts.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleAmountSelect(item.amount)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            donationAmount === item.amount && customAmount === ""
                              ? "border-red-600 bg-red-50"
                              : "border-gray-200 hover:border-red-300"
                          }`}
                        >
                          <div className="text-2xl font-bold text-gray-800 mb-2">
                            ${item.amount}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Custom Amount</h3>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="pl-10 text-lg py-3"
                        min="1"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                          <CreditCard className="mr-3 h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">Credit/Debit Card</div>
                            <div className="text-sm text-gray-500">Visa, MasterCard, American Express</div>
                          </div>
                        </Label>
                        <Badge variant="secondary">Most Popular</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center cursor-pointer flex-1">
                          <div className="w-5 h-5 mr-3 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            P
                          </div>
                          <div>
                            <div className="font-medium">PayPal</div>
                            <div className="text-sm text-gray-500">Pay with your PayPal account</div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="mpesa" id="mpesa" />
                        <Label htmlFor="mpesa" className="flex items-center cursor-pointer flex-1">
                          <Smartphone className="mr-3 h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">M-Pesa</div>
                            <div className="text-sm text-gray-500">Mobile money payment</div>
                          </div>
                        </Label>
                        <Badge variant="outline">Kenya</Badge>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Donor Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="donor-name">Full Name *</Label>
                        <Input
                          id="donor-name"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="donor-email">Email Address *</Label>
                        <Input
                          id="donor-email"
                          type="email"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                          placeholder="Enter your email"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="donor-phone">Phone Number (Optional)</Label>
                      <Input
                        id="donor-phone"
                        type="tel"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button 
                    onClick={handleDonate}
                    size="lg" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Donate ${getFinalAmount() || "0"} Now
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    🔒 Your donation is secure and encrypted. You'll receive a tax-deductible receipt via email.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Impact Summary */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Your Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  {getFinalAmount() && parseFloat(getFinalAmount()) > 0 ? (
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-3xl font-bold text-red-600 mb-2">
                          ${getFinalAmount()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Your generous donation
                        </div>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-blue-600 mr-2" />
                          <span>Supports {Math.floor(parseFloat(getFinalAmount()) / 25) || 1} children</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-green-600 mr-2" />
                          <span>Funds {Math.floor(parseFloat(getFinalAmount()) / 10) || 1} hours of education</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-purple-600 mr-2" />
                          <span>Provides {Math.floor(parseFloat(getFinalAmount()) / 15) || 1} counseling sessions</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      Select an amount to see your impact
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Why Donate?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-800">Direct Impact</div>
                      <div className="text-sm text-gray-600">100% of donations go directly to program funding</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-800">Tax Deductible</div>
                      <div className="text-sm text-gray-600">All donations are tax-deductible as allowed by law</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-800">Transparent Use</div>
                      <div className="text-sm text-gray-600">Regular updates on how your money helps children</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Other Ways to Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Volunteer Your Time
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Corporate Partnership
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Monthly Giving Program
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Sponsor a Child
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trusted by Our Community</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to transparency and accountability in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">501(c)(3)</div>
              <div className="text-gray-600">Registered Non-Profit</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">A+</div>
              <div className="text-gray-600">Charity Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">1,247</div>
              <div className="text-gray-600">Children Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">$125K</div>
              <div className="text-gray-600">Donated This Year</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
