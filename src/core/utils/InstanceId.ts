export class InstanceId {

    private static readonly words: string[] = [
        "Lion", "Tiger", "Eagle", "Falcon", "Panda",
        "Dolphin", "Parrot", "Sparrow", "Penguin", "Koala",
        "Cheetah", "Owl", "Rabbit", "Fox", "Wolf",
        "Bear", "Camel", "Zebra", "Peacock", "Llama",
        "Otter", "Seal", "Whale", "Toucan", "Flamingo",
        "Giraffe", "Hawk", "Moose", "Antelope", "Pelican",
        "Jay", "Robin", "Swan", "Heron", "Crane",
        "Kite", "Orca", "Macaw", "Canary", "Finch"
    ];

    static generate(ref?: string, includeRandomNumber: boolean = false): string {
        const randomWord = this.words[Math.floor(Math.random() * this.words.length)];
        const randomId = Math.floor(Math.random() * 1000000);

        const base = ref ? `${ref}-${randomWord}` : randomWord;

        return includeRandomNumber ? `${base}-${randomId}` : base;
    }
}
