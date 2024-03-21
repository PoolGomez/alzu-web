import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
    
    <Hero />
    <HomeMenu />
    <section className="text-center my-16" id="about">
      <SectionHeader subHeader={'Our story'} mainHeader={'About us'}/>
      {/* text en tritico
      <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex gap-4">  */}
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nam maxime laborum ratione cum. Facere voluptas eius alias totam repudiandae molestiae delectus ipsa aspernatur, maiores odit provident veniam rerum cupiditate.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error odit nostrum expedita minus doloribus, necessitatibus ex ad ab consectetur excepturi, laborum maiores. Numquam earum aut architecto quod accusamus tenetur ratione.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptates dignissimos quidem atque? Debitis voluptas culpa dolorum laudantium aperiam alias tenetur officiis? Laborum labore magnam sit saepe, recusandae adipisci aut?
        </p>
      </div>
      
    </section>
    <section className="text-center my-8" id="contact">
      <SectionHeader subHeader={'Dont hesitate'} mainHeader={'Contact us'} />
      <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="tel:+12344563533">+12344563533</a>
      </div>
      
    </section>
    
    
      
    </>
    
  );
}
