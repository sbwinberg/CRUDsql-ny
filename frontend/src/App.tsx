import { Routes, Route } from 'react-router-dom'
import Login from './routes/Login'
import { Register } from './components/component/register'
import { CreateEmail } from './routes/CreateEmail'
// import CreateCampaign from './routes/Create-Campaign'
// import { SpecificCampaign } from './components/specific-campaign'
import { CampaignPage } from './routes/campaignsPage/CampaignPage'
import { Homepage } from './routes/Home'
import { GeneratedEmail } from './routes/GeneratedEmail'
import Layout from './Layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campaign" element={<CampaignPage />} />
        <Route path="/create-email" element={<CreateEmail />} />
        {/* <Route path="/create-campaign" element={<CreateCampaign />} /> */}
        <Route path="/generated-email" element={<GeneratedEmail />} />
        {/* <Route path="/campaign/:id" element={<SpecificCampaign />} /> */}
      </Route>
    </Routes>

  )
}

export default App
