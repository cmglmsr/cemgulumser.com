import { BlogPost } from '../../types/blog';

const post: BlogPost = {
  id: 'oxford-research',
  blogId: 2,
  title: 'My Journey into Cybersecurity Research at Oxford',
  slug: 'cybersecurity-research-oxford-journey',
  excerpt: 'Reflecting on my experience pursuing an MSc in Software and Systems Security at the University of Oxford and how it shaped my research perspective.',
  content: `# My Journey into Cybersecurity Research at Oxford

Starting my MSc in Software and Systems Security at the University of Oxford has been one of the most transformative experiences of my academic and professional career.

## Why Oxford?

The decision to pursue advanced studies at Oxford wasn't made lightly. After completing my undergraduate degree at Bilkent University and gaining practical experience in cybersecurity, I felt the need to deepen my theoretical understanding and contribute to cutting-edge research.

Oxford's Department of Computer Science has a rich history of contributions to cybersecurity research, and the opportunity to work alongside world-renowned researchers was too compelling to pass up.

## Current Research Focus

### Anomaly Detection in Industrial Control Systems

My current research collaboration focuses on detecting anomalous and malicious behavior within industrial control systems (ICS) using Bayesian Networks. This work is particularly relevant given the increasing digitization of critical infrastructure.

**Why This Matters:**
- Industrial control systems are becoming increasingly connected
- Traditional security measures are often insufficient for ICS environments
- The consequences of ICS compromise can be catastrophic

### The Technical Approach

We're developing a novel method that uses Bayesian Networks to model normal system behavior and identify deviations that might indicate malicious activity.

\`\`\`python
# Simplified example of our approach
import numpy as np
from pgmpy.models import BayesianNetwork
from pgmpy.inference import VariableElimination

# Define network structure for ICS components
model = BayesianNetwork([
    ('Sensor', 'Controller'),
    ('Controller', 'Actuator'),
    ('Network', 'Controller')
])

# Model parameters would be learned from normal operation data
# Anomaly detection through inference
inference = VariableElimination(model)
\`\`\`

## Balancing Work and Studies

One of the unique aspects of my Oxford experience is that I'm pursuing this degree part-time while working as a Senior Security Engineer at Garanti BBVA. This dual commitment has taught me valuable lessons about time management and the practical application of academic concepts.

**Key Learnings:**
- Theoretical knowledge enhances practical problem-solving
- Industry experience provides valuable context for academic research
- The combination of both creates a well-rounded security professional

## Research Impact and Future Directions

Our research has the potential to significantly improve the security posture of critical infrastructure. The Bayesian Network approach offers several advantages:

1. **Interpretability**: Unlike black-box ML models, Bayesian Networks provide clear reasoning
2. **Robustness**: They can handle uncertainty and incomplete data
3. **Adaptability**: Models can be updated as systems evolve

## Looking Ahead

As I continue my research journey, I'm excited about the potential to contribute meaningful insights to the cybersecurity community. The intersection of academic rigor and practical application is where I believe the most impactful security research happens.

## Resources and Further Reading

For those interested in learning more about ICS security and anomaly detection:

- [NIST Cybersecurity Framework for Critical Infrastructure](https://www.nist.gov/cyberframework)
- [Industrial Control Systems Security](https://www.cisa.gov/industrial-control-systems-security)
- [Bayesian Networks in Security Applications](https://example.com/research-paper)

---

*This blog post reflects my personal experiences and opinions. For the latest updates on our research, please follow my academic publications.*`,
  coverImage: '/images/blog/oxford-research.jpg',
  images: ['/images/blog/oxford-campus.jpg', '/images/blog/research-lab.jpg'],
  author: {
    name: 'Mustafa Cem Gülümser',
    avatar: '/images/profile/profile.jpg'
  },
  publishedAt: '2024-12-10T14:30:00Z',
  updatedAt: '2024-12-10T14:30:00Z',
  tags: ['Oxford', 'Research', 'Cybersecurity', 'Industrial Control Systems', 'Bayesian Networks', 'Academic'],
  category: 'research',
  readTime: 12,
  featured: true,
  published: true,
  externalLinks: {
    linkedin: 'https://www.linkedin.com/in/cem-g%C3%BCl%C3%BCmser-2b685a213/',
    github: 'https://github.com/cmglmsr'
  },
  seo: {
    title: 'My Journey into Cybersecurity Research at Oxford - MSc Experience',
    description: 'Reflecting on my experience pursuing an MSc in Software and Systems Security at the University of Oxford and current research in ICS security.',
    keywords: ['Oxford', 'Cybersecurity Research', 'Industrial Control Systems', 'Bayesian Networks', 'MSc', 'Academic Research']
  }
};

export default post;

