import Image from "next/image";
import { dutiesProvided } from "@/lib/dutiesProvided";

type DutiesProvidedSectionProps = {
    eyebrow?: string;
    title?: string;
    description?: string;
    className?: string;
};

export default function DutiesProvidedSection({
    eyebrow = "Our Care Services",
    title = "Duties Provided",
    description = "We provide compassionate, personalized support to help clients stay safe, comfortable, and independent at home.",
    className = "",
}: DutiesProvidedSectionProps) {
    return (
        <section
            className={`mx-auto max-w-[1400px] px-6 py-16 md:px-10 lg:px-12 lg:py-20 ${className}`}
        >
            <div className="max-w-3xl">
                {eyebrow ? (
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f73d8]">
                        {eyebrow}
                    </p>
                ) : null}

                {title ? (
                    <h2 className="mt-3 text-4xl font-extrabold text-[#00456B]">
                        {title}
                    </h2>
                ) : null}

                {description ? (
                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        {description}
                    </p>
                ) : null}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {dutiesProvided.map((duty) => (
                    <div
                        key={duty.name}
                        className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#D9F1F7]" />

                        <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00456B] shadow-md">
                            <Image
                                src={duty.icon}
                                alt={`${duty.name} icon`}
                                width={38}
                                height={38}
                                className="object-contain brightness-0 invert"
                            />
                        </div>

                        <h3 className="relative text-xl font-bold text-[#00456B]">
                            {duty.name}
                        </h3>

                        <p className="relative mt-3 text-sm leading-7 text-slate-600">
                            {duty.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
