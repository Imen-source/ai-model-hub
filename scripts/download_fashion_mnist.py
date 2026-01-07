import torchvision
from torchvision import transforms
from PIL import Image
import os

# Map labels to class names
labels_map = [
    "T-shirt_top", "Trouser", "Pullover", "Dress", "Coat",
    "Sandal", "Shirt", "Sneaker", "Bag", "Ankle_boot"
]

# Folder to save images
os.makedirs("fashion_mnist_samples", exist_ok=True)

# Download Fashion-MNIST train dataset
dataset = torchvision.datasets.FashionMNIST(
    root="./data",
    train=True,
    download=True
)

# Save 5 sample images
for idx in range(5):
    image, label = dataset[idx]
    if not isinstance(image, Image.Image):
        image = transforms.ToPILImage()(image)
    
    # Optional: resize for better visibility
    image = image.resize((100, 100))

    # Filename includes label for clarity
    filename = f"fashion_mnist_samples/{idx}_{labels_map[label]}.png"
    image.save(filename)
    print(f"Saved {filename}")
