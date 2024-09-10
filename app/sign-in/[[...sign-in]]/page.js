"use client"
import { AppBar, Container, Typography, Toolbar, Button, Link, Box } from "@mui/material";
import { SignIn } from "@clerk/clerk-react";

export default function SignUpPage() {
    return (<Container maxWidth="100vw">
        <AppBar position="static" >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Flashcards Saas
                </Typography>
                <Button color="inherit">
                    <Link href="/sign-in" passHref>
                    <Typography sx={{ color: 'white' }}>Login</Typography>

                    </Link>

                </Button>
                <Button color="inherit">
                    <Link href="/sign-up" passHref>
                        
                        <Typography sx={{ color: 'white' }}>Sign Up</Typography>

                    </Link>

                </Button>
            </Toolbar>
        </AppBar>
        <Box display="flex"
            flexDirection="column"
            alignItems="center"
            JustifyContent="center">
            <Typography variant="h4">Sign In</Typography>
            <SignIn />
        </Box>
    </Container>)
}