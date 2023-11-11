import React from "react";
import Formation from "../Cards/Formation";

const AllCourses = () => {
    const courses = [
        {
            id: 1,
            title: "Introduction à la peinture",
            createdAt: "15 janvier 2024 à 12h00",
            author: "Jean Dupont",
            description:
                "Apprenez les bases de la peinture et créez votre première œuvre d'art.",
        },
        {
            id: 2,
            title: "Plomberie 101",
            createdAt: "22 février 2024 à 09h00",
            author: "Marie Martin",
            description:
                "Initiez-vous à la plomberie et apprenez à réparer les problèmes courants dans la maison.",
        },
        {
            id: 3,
            title: "Menuiserie Avancée",
            createdAt: "10 mars 2024 à 10h00",
            author: "Robert Tremblay",
            description:
                "Portez vos compétences en menuiserie au niveau supérieur avec des techniques avancées.",
        },
        {
            id: 4,
            title: "Introduction à la photographie",
            createdAt: "18 avril 2024 à 14h00",
            author: "Sylvie Lefebvre",
            description:
                "Apprenez les bases de la photographie et capturez des images éblouissantes.",
        },
        {
            id: 5,
            title: "Bootcamp de Développement Web",
            createdAt: "25 mai 2024 à 08h00",
            author: "Michel Gagnon",
            description:
                "Devenez un développeur web full-stack avec ce bootcamp complet.",
        },
    ];
    

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <Formation
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    createdAt={course.createdAt}
                    author={course.author}
                    description={course.description}
                    image={course.image}
                />
            ))}
        </div>
    );
};

export default AllCourses;
