import "./whycerna.css";
import Link from "next/link";
import Image from "next/image";
import LatestCernaEvents from "@/components/LatestCernaEvents";

export default function WhyCernaPage() {
    return (
        <main className="bg-white text-slate-900">

            <section className="why-hero">
                <div className="why-hero-container">
                    <div className="why-hero-grid">
                        {/* Left Image */}
                        <div className="why-hero-image-wrap">
                            <Image
                                src="/assets/cernaoffcie.png"  
                                alt="Cerna Home Care building"
                                width={420}
                                height={260} 
                            />
                        </div>

                        {/* Right Content */}
                        <div className="why-hero-content">
                            <h1 className="why-hero-title">
                                Why Cerna Home Care
                            </h1>

                            <p className="why-hero-text">
                                An Irvine-based home care and nursing services company that specializes
                                in care and support services for the elderly. Cerna has found that
                                enlisting a caregiver not only reduces stress among the family but also
                                significantly improves the life of the care recipient.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-checks">
                <div className="why-checks-container">
                    <div className="why-checks-grid">
                        {/* LEFT COLUMN */}
                        <ul className="why-checks-list">
                            <li>Top Rated Reviews</li>
                            <li>State Licensed</li>
                            <li>All staff are W2 Employees</li>
                            <li>Insurance Accepted</li>
                            <li>Workers’ Compensation Insurance</li>
                            <li>Liability Insurance</li>
                            <li>Cognitive Care</li>
                            <li>Part time and Fulltime Programs</li>
                            <li>Competitive Rates</li>
                            <li>Customized Care Plans</li>
                            <li>All staff are Bonded</li>
                            <li>All staff are CPR and First Aid Certified</li>
                        </ul>

                        {/* RIGHT COLUMN */}
                        <ul className="why-checks-list">
                            <li>Certified as Level I or Level II</li>
                            <li>VA Contract</li>
                            <li>Financial Assistance</li>
                            <li>Free Assessment</li>
                            <li>Transportation services available</li>
                            <li>Care Aides are Trained and Accountable</li>
                            <li>Progress and Daily Care Notes</li>
                            <li>Specialized Levels of Care</li>
                            <li>Experienced Management</li>
                            <li>Higher Paid Staff</li>
                            <li>Over 500 Caregivers Employed</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="why-training-section">
                <div className="why-training-container">
                    <div className="why-training-row">
                        <div className="why-training-image-wrap">
                            <Image
                                src="/assets/training.webp"
                                alt="Training and development"
                                width={451}
                                height={299}
                                className="why-training-image"
                            />
                        </div>

                        <div className="why-training-content">
                            <h2 className="why-training-title">Cerna Home Care – Training</h2>

                            <p className="why-training-text">
                                At Cerna Homecare we are constantly training and keeping our Care Providers at
                                the highest level of knowledge and industry standards. You never know what may
                                arise in an In Home Care scenario so it makes sense to be as prepared as possible
                                and capable of handling any and every situation.
                            </p>

                            <p className="why-training-text">
                                Through our In House Care training programs and a relentless commitment to being
                                the best, we can and do provide an above average Elderly Care Service.
                            </p>
                        </div>
                    </div>

                    <div className="why-training-row why-training-row--bottom">
                        <div className="why-training-image-wrap">
                            <Image
                                src="/assets/group.webp"
                                alt="Awards Group"
                                width={451}
                                height={299}
                                className="why-training-image"
                            />
                        </div>

                        <div className="why-training-content">
                            <h2 className="why-training-title">Cerna Home Care – In The Office</h2>

                            <p className="why-training-text">
                                Another very important part of providing care for family members with Alzheimer’s,
                                Memory or Dementia needs, Cognitive, Nursing or Live In Care is insuring that the
                                Care Professional is Licensed, Bonded and Trained in every aspect of the needs your
                                loved one may require.
                            </p>

                            <p className="why-training-text">
                                That is why we have always provided an in depth Care Assessment prior to making any
                                plans or arrangements in order to properly evaluate your needs. Selecting the right
                                Caregiver can be the difference that makes this a wonderful experience for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <LatestCernaEvents />

      </main>
    );
}