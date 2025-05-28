# Smart Inventory System

A comprehensive inventory management system with backend and frontend components.

## GitHub Authentication Instructions

To push code to this repository, follow these steps:

### Option 1: Use HTTPS with Personal Access Token (PAT)

1. Create a Personal Access Token on GitHub:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
   - Give it a name, set expiration, and check the "repo" scope
   - Click "Generate token" and copy it

2. Configure Git to use your token:
   ```
   git remote set-url origin https://DynoZeus:<YOUR_TOKEN>@github.com/DynoZeus/smart-inventory-system.git
   ```

3. Push your code:
   ```
   git push -u origin main
   ```

### Option 2: Set up SSH (Recommended)

1. Generate an SSH key:
   ```
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Start the SSH agent:
   ```
   eval "$(ssh-agent -s)"
   ```

3. Add your SSH key to the agent:
   ```
   ssh-add ~/.ssh/id_ed25519
   ```

4. Copy your SSH public key:
   ```
   cat ~/.ssh/id_ed25519.pub | pbcopy
   ```

5. Add the key to your GitHub account:
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste your key and save

6. Set your remote URL to use SSH:
   ```
   git remote set-url origin git@github.com:DynoZeus/smart-inventory-system.git
   ```

7. Push your code:
   ```
   git push -u origin main
   ``` 