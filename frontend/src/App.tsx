import { Routes, Route } from 'react-router-dom'
import { Register } from './components/component/register'
// import Login from './routes/Login'
// import Register from './routes/Register'
// import Campaign from './routes/Campaign'
// import CreateEmail from './routes/Create-email'
// import CreateCampaign from './routes/Create-Campaign'
// import GeneratedEmail from './components/component/Generated-email'
// import SpecificCampaign from './routes/Specific-campaign'

function App() {
  return (
    <Routes>
     {/*  <Route path="/login" element={<Login />} /> */}
      <Route path="/register" element={<Register />} />
     {/* <Route path="/campaign" element={<Campaign />} /> */}
      {/* <Route path="/create-email" element={<CreateEmail />} /> */}
      {/* <Route path="/create-campaign" element={<CreateCampaign />} /> */}
      {/* <Route path="/generated-email" element={<GeneratedEmail />} /> */}
      {/* <Route path="/campaign/:id" element={<SpecificCampaign />} /> */}
    </Routes>
  
  )
}

export default App
