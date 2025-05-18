import { boolean } from "zod";

export class InstanceId {

    static generate(ref?: string): string {
        // List of animals to use
        const animals = [
            "Lion", "Tiger", "Elephant", "Giraffe", "Zebra",
            "Kangaroo", "Penguin", "Panda", "Koala", "Cheetah",
            "Leopard", "Owl", "Wolf", "Monkey", "Dolphin",
            "Bear", "Rabbit", "Squirrel", "Fox", "Eagle",
            "Hawk", "Bat", "Parrot", "Pelican", "Ostrich",
            "Penguin", "Horse", "Cow", "Sheep", "Goat",
            "Donkey", "Camel", "Alpaca", "Llama", "Jaguar",
            "Rhinoceros", "Hippo", "Sloth", "Koala", "Armadillo",
            "Beetle", "Crocodile", "Alligator", "Mole", "Badger",
            "Otter", "Weasel", "Skunk", "Porcupine", "Raccoon",
            "Kangaroo", "Wallaby", "Emu", "Flamingo", "Stork",
            "Peacock", "Pigeon", "Woodpecker", "Quail", "Crow",
            "Raven", "Seagull", "Starling", "Finch", "Sparrow",
            "Cardinal", "Canary", "Hummingbird", "Macaw", "Cockatoo",
            "Toucan", "Goose", "Duck", "Swallow", "Cuckoo",
            "Woodcock", "Wren", "Pheasant", "Parakeet", "Vulture",
            "Condor", "Buzzard", "Eagle", "Falcon", "Kite",
            "Condor", "Peafowl", "Heron", "Kingfisher", "Cormorant",
            "Ibis", "Swallowtail", "Moth", "Butterfly", "Dragonfly",
            "Grasshopper", "Cricket", "Locust", "Termite", "Ant",
            "Bee", "Wasp", "Hornet", "Fly", "Mosquito",
            "Ladybug", "Caterpillar", "Spider", "Scorpion", "Centipede",
            "Millipede", "Snail", "Slug", "Earthworm", "Leech",
            "Lobster", "Crab", "Shrimp", "Octopus", "Squid",
            "Starfish", "Sea Urchin", "Coral", "Jellyfish", "Clam",
            "Oyster", "Mussel", "Scallop", "Turtle", "Sea Lion",
            "Seal", "Walrus", "Manatee", "Whale", "Dolphin",
            "Narwhal", "Beluga", "Sperm Whale", "Orca", "Humpback Whale",
            "Blue Whale", "Fin Whale", "Minke Whale", "Pilot Whale", "Bowhead Whale",
            "Shark", "Great White Shark", "Hammerhead Shark", "Tiger Shark", "Bull Shark",
            "Whale Shark", "Mako Shark", "Reef Shark", "Nurse Shark", "Lemon Shark",
            "Rays", "Stingray", "Manta Ray", "Electric Ray", "Sawfish",
            "Piranha", "Alligator Gar", "Barracuda", "Catfish", "Trout",
            "Salmon", "Carp", "Bass", "Perch", "Snapper",
            "Cod", "Herring", "Tuna", "Mahi-mahi", "Swordfish",
            "Eel", "Anchovy", "Squid", "Octopus", "Clownfish",
            "Angelfish", "Goldfish", "Betta", "Guppy", "Neon Tetra",
            "Cichlid", "Koi", "Zebrafish", "Barb", "Rainbow Fish",
            "Largemouth Bass", "Tilapia", "Chub", "Crappie", "Walleye"
        ];

        // Generate a random index to select an animal from the list
        const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

        const enableRandomId = false;
        if (!enableRandomId) {
            return `${ref}-${randomAnimal}`;
        }


        // Generate a random number (you can specify the range or length here)
        const randomId = Math.floor(Math.random() * 1000000); // Random number from 0 to 999999

        // Combine animal name with random number to create a unique instance ID
        return `${ref}-${randomAnimal}-${randomId}`;
    }
}
