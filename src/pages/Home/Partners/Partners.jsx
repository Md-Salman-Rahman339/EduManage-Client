import React from 'react'
import { Grid, Card, CardContent, Typography, Avatar } from '@mui/material';

const partners = [
  {
    name: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg",
    description: "Working together on advancing AI-powered developer tools.",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    description: "Partnered for cloud infrastructure and AI research.",
  },
  {
    name: "GitHub",
    logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    description: "Collaborating to enhance open-source project management tools.",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    description: "Supporting enterprise-grade integrations and cloud-based development environments.",
  },
  {
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    description: "Providing scalable cloud infrastructure for global deployment and analytics.",
  },
];

const Partners = () => {
  return (
     <div style={{ padding: 40 }}>
      <Typography variant="h4" align="center" gutterBottom>Our Partners</Typography>
      <Grid container spacing={4} justifyContent="center">
        {partners.map((partner, i) => (
          <Grid item key={i}>
            <Card sx={{ width: 220, textAlign: 'center' }}>
              <CardContent>
                <Avatar
                  src={partner.logo}
                  alt={partner.name}
                  sx={{ width: 60, height: 60, margin: '0 auto 10px' }}
                />
                <Typography variant="h6">{partner.name}</Typography>
                <Typography variant="body2">{partner.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Partners
