'use client';  // Detta kan vara nödvändigt om du har interaktiva element

import CampaignsPageComponent from "@/components/campaigns-page";

export default function CampaignPage() {
    return (
        <div>
            <h1>Välkommen till kampanjsidan</h1>
            <CampaignsPageComponent />
        </div>
    );
}
