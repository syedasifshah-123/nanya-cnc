// app/about/page.tsx

export const metadata = {
    title: "About Us | NANYA CNC – Engineering Excellence Since 2010",
    description:
        "Learn about NANYA CNC, a global manufacturer of high-precision CNC machines, driven by innovation, quality, and smart manufacturing solutions.",
};

export default function AboutPage() {
    return (
        <main className="bg-white text-gray-800">
            {/* HERO SECTION */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Engineering Excellence Since 2010
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                        From a humble beginning as a small workshop to becoming a globally
                        trusted CNC manufacturing brand, NANYA CNC has been driven by one
                        unwavering goal — precision without compromise.
                    </p>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-900">
                            About NANYA CNC
                        </h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Established in 2010, NANYA CNC specializes in the design,
                            development, and manufacturing of high-precision CNC machining
                            solutions, including Vertical Machining Centers, Horizontal
                            Machining Centers, and advanced CNC Lathe machines.
                        </p>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Our machines are trusted by manufacturers worldwide for their
                            accuracy, durability, reliability, and high productivity —
                            enabling superior manufacturing performance across industries.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            Global Manufacturing Strength
                        </h3>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            From our advanced manufacturing facilities in China, supported by
                            strong Taiwanese engineering expertise, we design machines that
                            meet the highest international quality standards.
                        </p>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Today, NANYA CNC proudly serves customers in over 50 countries,
                            delivering reliable, innovative, and cost-effective CNC
                            solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* OUR STORY */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center">
                        Our Story
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed max-w-4xl mx-auto text-center">
                        NANYA CNC was founded with a clear and powerful vision: to make
                        world-class CNC technology accessible to industries across the
                        globe. What began as a modest operation has evolved into an
                        ultra-modern manufacturing enterprise equipped with advanced
                        production facilities and strict quality control systems.
                    </p>
                    <p className="mt-4 text-gray-600 leading-relaxed max-w-4xl mx-auto text-center">
                        Quality is not just a standard at NANYA CNC — it is a commitment.
                        Every machine undergoes rigorous testing and inspection procedures
                        to ensure consistent performance, long-term reliability, and
                        durability.
                    </p>
                </div>
            </section>

            {/* OUR JOURNEY */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center">
                        Our Journey
                    </h2>

                    <div className="mt-12 grid md:grid-cols-4 gap-8">
                        {[
                            {
                                year: "2010",
                                title: "Foundation",
                                desc: "Founded in Wuxi, Jiangsu, China with strong Taiwanese engineering influence.",
                            },
                            {
                                year: "2014",
                                title: "Global Expansion",
                                desc: "First international exports, marking the beginning of our global footprint.",
                            },
                            {
                                year: "2018",
                                title: "Innovation Milestone",
                                desc: "Expanded product range including 5-Axis Machining Centers and advanced lathe solutions.",
                            },
                            {
                                year: "2025",
                                title: "Smart Manufacturing",
                                desc: "Serving customers in 50+ countries with AI-driven CNC automation solutions.",
                            },
                        ].map((item) => (
                            <div
                                key={item.year}
                                className="border rounded-xl p-6 bg-white shadow-sm"
                            >
                                <h3 className="text-xl font-bold text-blue-600">
                                    {item.year}
                                </h3>
                                <h4 className="mt-2 font-semibold text-gray-900">
                                    {item.title}
                                </h4>
                                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-gray-900 text-center">
                        Our Services
                    </h2>

                    <p className="mt-6 text-gray-600 text-center max-w-3xl mx-auto">
                        NANYA CNC provides complete lifecycle support to ensure optimal
                        machine performance and maximum uptime.
                    </p>

                    <ul className="mt-10 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            "Machine installation and commissioning",
                            "Operator and technical training",
                            "Preventive and corrective maintenance",
                            "Genuine spare parts supply",
                            "Professional technical support and troubleshooting",
                        ].map((service) => (
                            <li
                                key={service}
                                className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                            >
                                <span className="text-blue-600 font-bold">✔</span>
                                <span className="text-gray-700">{service}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">
                <h2 className="text-3xl font-semibold text-gray-900">
                    Partner with NANYA CNC
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Experience precision engineering, smart manufacturing, and reliable
                    CNC solutions designed to elevate your production capabilities.
                </p>
                <a
                    href="/contact"
                    className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Contact Us
                </a>
            </section>
        </main>
    );
}
