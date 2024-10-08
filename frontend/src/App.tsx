import { Routes, Route } from 'react-router-dom'
import Login from './routes/Login'
import { Register } from './components/component/register'
import CreateEmail from './routes/create-email'
// import CreateCampaign from './routes/Create-Campaign'
import GeneratedEmail from './routes/generated-email'
// import { SpecificCampaign } from './components/specific-campaign'
import Campaign from './routes/campaign'
import { Homepage } from './routes/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     <Route path="/campaign" element={<Campaign />} />
      <Route path="/create-email" element={<CreateEmail />} />
      {/* <Route path="/create-campaign" element={<CreateCampaign />} /> */}
      <Route path="/generated-email" element={<GeneratedEmail />} />
      {/* <Route path="/campaign/:id" element={<SpecificCampaign />} /> */}
    </Routes>
  
  )
}

export default App
