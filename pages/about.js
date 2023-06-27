import AboutSectionOne from "@/components/AboutSectionOne";
import AboutSectionTwo from "@/components/AboutSectionTwo";
import Wrapper from "@/components/Wrapper";
const AboutPage = () => {
    return (
        <div className="min-h-[650px] flex items-center">
            <Wrapper>
                <div className="rounded-lg p-10 border border-black mx-auto flex flex-col">
                    
                <AboutSectionOne />
                <AboutSectionTwo/>

                </div>
            </Wrapper>
        </div>
    );

};

export default AboutPage;
