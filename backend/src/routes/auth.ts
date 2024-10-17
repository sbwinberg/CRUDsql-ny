import { Router } from "express";
import passport from "passport";
import "../authStrategies/githubStrategy";
import { Request, Response } from "express";

const app = Router();

app.get("/", passport.authenticate("github"));

app.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req: Request, res: Response) {
    // res.redirect('/profile');
    // Indikerar att användaren är inloggad
    res.redirect("http://localhost:5173/?loggedIn=true");
  }
);

app.get("/profile", (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/github");
  }
  res.json(req.user);
});

// ---------------------------------------------------------------------------
// Utloggningsrutt
app.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ message: "Error logging out" });
    }
    res.redirect("http://localhost:5173/");
  });
});
// ---------------------------------------------------------------------------

export default app;
