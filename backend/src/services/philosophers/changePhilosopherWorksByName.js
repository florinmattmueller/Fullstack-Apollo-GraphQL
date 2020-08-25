import Philosophers from "./PhilosophersService";

const changePhilosopherWorksByName = async (args) => {
    const name = args.name;
    let works = args.works;

    const philosopher = await Philosophers.findOne({ name });

    if (!name) {
        throw Error("You must provide a name");
    } else if (!philosopher) {
        throw Error("Philosopher not found");
    }

    if (works === "???") {
        throw Error(
            "??? or 000 for numbers is a placeholder for an empty input"
        );
    } else if (!works) {
        works = "???";
    } else if (!(works === "???")) {
        if (works === philosopher.works) {
            console.warn("The same works as before");
        }
    }

    philosopher.works = works;

    await philosopher.save();

    return philosopher;
};

export default changePhilosopherWorksByName;