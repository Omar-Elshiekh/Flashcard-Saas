'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Import useState
import getStripe from "@/utlis/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography, Alert } from "@mui/material";
import Head from "next/head";

export default function Home() {
  const [showError, setShowError] = useState(false); // State to show the error message

  const handleGetStarted = () => {
    setShowError(true);
  };

  const handleSubmit = async (plan) => {
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),  // Send the selected plan
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSessionJson.message);
        return;
      }

      const stripe = await getStripe();

      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>
          Flashcard SaaS
        </title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{
        textAlign: 'center',
        my: 4,
      }}>
        <Typography variant="h2">
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5">
          The best way to make flashcards from scratch
        </Typography>

        {/* Show the Get Started button only if signed in */}
        <SignedIn>
          <Link href={'/generate'}>
            <Button variant="contained"  sx={{ mt: 2, backgroundColor: '#FF5733', color: 'white' }}>
              Get Started
            </Button>
          </Link>
        </SignedIn>

        {/* If the user is signed out, show an error message after attempting to click */}
        <SignedOut>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleGetStarted}>
            Get Started
          </Button>
        </SignedOut>

        {showError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Please sign in to get started!
          </Alert>
        )}
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">
              Easy Text Input
            </Typography>
            <Typography>{' '}Simply input your text</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">
              Smart Flashcards
            </Typography>
            <Typography>{' '}Our AI intelligently breaks down your text into concise flashcards, perfect for studying</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">
              Accessible Anywhere
            </Typography>
            <Typography>{' '}Access your flashcards from any device, at any time. Study on the go with ease.</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom >
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom >
                $5 / month
              </Typography>
              <Typography gutterBottom>{' '}Access to basic flashcard features and limited storage.</Typography>
              <Button variant="contained" sx={{ backgroundColor: '#FF5733', color: 'white' }} onClick={() => handleSubmit('basic')}>
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom >
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography gutterBottom>{' '}Unlimited flashcards and storage, with priority support.</Typography>
              <Button variant="contained" sx={{ backgroundColor: '#FF5733', color: 'white' }} onClick={() => handleSubmit('pro')}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
