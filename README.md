
In production, the client and server are deployed as separate services on Render, with the client's build-time `VITE_API_URL` pointed at the live backend.

---

## CI/CD Pipeline

This repo uses **GitHub Actions** to automate building and publishing Docker images:

- **Trigger:** every push to `main`
- **Steps:** checkout code → log in to Docker Hub → build & push `reread-server` and `reread-client` images
- **Registry:** [Docker Hub - anujx01](https://hub.docker.com/u/anujx01)

Workflow file: [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml)

Pull the published images directly:
```bash
docker pull anujx01/reread-server:latest
docker pull anujx01/reread-client:latest
```

---

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy

**Note:** Render's free tier blocks Nodemailer's default SMTP. This project uses Brevo's API instead.

### Frontend (Render static site)
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables (`VITE_API_URL` pointing to your live backend)
5. Deploy

## Why Brevo Instead of Nodemailer?
Render's free tier restricts SMTP port access, preventing traditional Nodemailer SMTP configurations from working. Brevo provides a reliable API-based email service that bypasses these restrictions while offering:
- Free tier with 300 emails/day
- Reliable delivery
- Email tracking and analytics
- Easy integration

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments
- Built with the MERN stack
- Authentication powered by Passport.js
- Email services by Brevo
- Containerized with Docker, orchestrated with Docker Compose
- CI/CD powered by GitHub Actions

## Contact
Email: anuj01062004@gmail.com
Project Link: https://reread.onrender.com