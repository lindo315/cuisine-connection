import React from "react";
import {
  ArrowRight,
  Utensils,
  Globe,
  HeartHandshake,
  Users,
  Leaf,
  Star,
} from "lucide-react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />

      <main className="flex-grow container mx-auto pt-28 px-4">
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
                About <span className="text-primary">Cuisine</span>Connection
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Connecting food lovers with amazing recipes from around the
                world.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-semibold tracking-tight mb-6 text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                At CuisineConnection, we believe that food is more than just
                sustenance — it's a universal language that brings people
                together. Our mission is to make cooking accessible, enjoyable,
                and inspiring for everyone, regardless of their skill level or
                culinary background.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We curate a diverse collection of recipes from around the world,
                celebrating the rich tapestry of global cuisine while helping
                you discover new flavors and cooking techniques. Whether you're
                a seasoned chef or just starting your culinary journey,
                CuisineConnection is your companion in the kitchen. Let's cook
                together!
              </p>
              <p className="text-lg text-primary dark:text-gray-300">
                <span className="font-bold">FYI:</span> This is all fake LMAO.
                But I put it here to make it nice and such.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-display font-semibold tracking-tight mb-4 text-gray-900 dark:text-white">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg mb-4">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Culinary Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're committed to quality recipes that are thoroughly tested
                  and reliable.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Cultural Diversity
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We celebrate cuisines from around the world, honoring their
                  unique traditions.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg mb-4">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Inclusivity
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We create content for cooks of all skill levels, backgrounds,
                  and dietary needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-display font-semibold tracking-tight mb-4 text-gray-900 dark:text-white">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                The passionate food lovers behind CuisineConnection.
              </p>
              <p className="text-lg text-primary">Lol they don't exist.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                  <img
                    src="chef_1.png"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                  Alex Thompson
                </h3>
                <p className="text-primary font-medium mb-2">
                  Founder & Head Chef
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Culinary expert with 15+ years of experience in restaurants
                  around the world.
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                  <img
                    src="chef_2.png"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                  Maya Rodriguez
                </h3>
                <p className="text-primary font-medium mb-2">
                  Recipe Developer
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Specializes in creating approachable recipes for home cooks of
                  all skill levels.
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                  <img
                    src="chef_3.png"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                  Jamal Williams
                </h3>
                <p className="text-primary font-medium mb-2">Nutritionist</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Ensures our recipes are balanced and cater to various dietary
                  preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-display font-semibold tracking-tight mb-4 text-gray-900 dark:text-white">
                Why Choose CuisineConnection
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                What makes our platform special
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex">
                <div className="mr-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                    <Star className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Curated Quality
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Every recipe is carefully tested and vetted to ensure
                    reliability and delicious results.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Vibrant Community
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Connect with fellow food enthusiasts, share tips, and get
                    inspired by others.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                    <Globe className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Global Cuisine
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Explore dishes from every corner of the world, with
                    authentic recipes and techniques.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                    <Leaf className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Dietary Options
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Find recipes for any dietary preference, from vegan to
                    gluten-free and everything in between.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white mb-20 dark:bg-primary-darker border-t border-b border-primary/10 rounded-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-semibold tracking-tight mb-6">
                Start Your Culinary Journey Today
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of food lovers already discovering new recipes on
                CuisineConnection
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition duration-150"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/recipes"
                  className="px-6 py-3 bg-primary-dark text-white font-medium rounded-lg border border-white/20 hover:bg-primary-darker transition duration-150 inline-flex items-center"
                >
                  Explore Recipes
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
