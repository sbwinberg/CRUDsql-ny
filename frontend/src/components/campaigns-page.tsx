"'use client'"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Calendar, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios";

interface Campaign {
  title: string
  description: string
  date: string
  emails: number
  id: number
}

const campaigns: Campaign[] = [
  { title: "Summer Promotion", description: "Promote our new summer product line", date: "June 1, 2023", emails: 5, id: 1 },
  { title: "Holiday Sale", description: "Promote our holiday product line", date: "November 15, 2023", emails: 12, id: 2 },
  { title: "Back to School", description: "Promote our back to school product line", date: "August 1, 2023", emails: 8, id: 3 },
  { title: "Spring Clearance", description: "Promote our spring clearance sale", date: "March 15, 2023", emails: 10, id: 4 },
  { title: "New Year Deals", description: "Promote our new year product line", date: "December 1, 2022", emails: 32, id: 5 },
  { title: "Fall Collection", description: "Promote our fall product line", date: "September 1, 2022", emails: 20, id: 6 },
  { title: "Winter Wonderland", description: "Promote our winter product line", date: "November 1, 2022", emails: 18, id: 7 },
]

export function CampaignsPageComponent() {
  // Function to navigate to specific campaign
  let navigate = useNavigate();
  function changeRoute(id: number): void {
    // navigate(`/campaign?id=${id}`);
    navigate(`/campaign/${id}`);
  }

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    productDescription: "",
    targetAudience: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // genererar dagens datum
  const todaysDate = new Date().toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1337/campaign", {
        ...formData,
        createdAtDate: todaysDate,
        userId: "3c4e743f-71bf-4546-b532-cb378b9def7c", // test hårdkodad userId ska fixas med autenticering
        emails: [] // oklart hur emails ens ska fungera?
      });




      console.log("Kampanj skapad:", response.data);
      setShowForm(false);
      // Uppdatera kampanjlistan här om det behövs
    } catch (error) {
      console.error("Fel vid skapande av kampanj:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Link to="/">Home</Link>
        <Button onClick={() => setShowForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {campaigns.map((campaign, index) => (
          <Card key={index} onClick={() => changeRoute(campaign.id)}>
            <CardHeader>
              <CardTitle>{campaign.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500 mb-2 dark:text-zinc-400">{campaign.description}</p>
              <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Created on {campaign.date}</span>
              </div>
              <div className="flex items-center text-sm text-zinc-500 mt-1 dark:text-zinc-400">
                <Mail className="mr-2 h-4 w-4" />
                <span>{campaign.emails} generated emails</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Create your campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-zinc-500 mb-1 dark:text-zinc-400">
                  Company name
                </label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="companyDescription" className="block text-sm font-medium text-zinc-500 mb-1 dark:text-zinc-400">
                  Company description
                </label>
                <Textarea
                  id="companyDescription"
                  placeholder="Describe your company"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="productDescription" className="block text-sm font-medium text-zinc-500 mb-1 dark:text-zinc-400">
                  Product description
                </label>
                <Textarea
                  id="productDescription"
                  placeholder="Describe your product or service"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-zinc-500 mb-1 dark:text-zinc-400">
                  Target audience
                </label>
                <Input
                  id="targetAudience"
                  placeholder="Who are you targeting?"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit">Create Campaign</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default CampaignsPageComponent;
