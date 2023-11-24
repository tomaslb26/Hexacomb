import { useEffect } from "react";

export default function usePreloadS1Images() {
    useEffect(() => {
        const faceArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

        const loadImage = (src : string) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        };

        const preloadImages = async () => {
            const imagePromises = faceArray.map((face) => {
                const imagePath = `/images/Season 1/${face}.jpg}`;
                return loadImage(imagePath);
            });

            try {
                await Promise.all(imagePromises);
                console.log('All images preloaded successfully');
            } catch (error) {
                console.error('Error preloading images:', error);
            }
        };

        preloadImages();
    }, []);

}