export interface User {
  id: String
  name: String
  email: String
  password: String
  campaign: Campaign[]
}

export interface Email {
  id: String
  subject: String
  content: String
  campaignId: String
  campaign: Campaign[]
  recipients: String[]
}

export interface Campaign {
  id: String
  companyName: String
  companyDescription: String
  productDescription: String
  targetAudience: String
  userId: String
  user: User
  emails: Email
}
export interface RequestCampaign {
  id: String
  companyName: String
  companyDescription: String
  productDescription: String
  targetAudience: String
  userId: String
  user: String
  emails: String
}

