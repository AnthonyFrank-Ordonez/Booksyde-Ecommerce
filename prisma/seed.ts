import type { Prisma } from '@/generated/prisma';

import prisma from '@/utils/prisma';

const booksData: Array<Prisma.BookCreateInput> = [
	{
		// id: 1,
		title: 'The Hunger Games',
		author: 'Suzanne Collins',
		genres: [
			'Young Adult',
			'Fiction',
			'Dystopia',
			'Fantasy',
			'Science Fiction',
			'Romance',
			'Adventure',
			'Teen',
			'Post Apocalyptic',
			'Action',
		],
		price: 5.09,
		description:
			"WINNING MEANS FAME AND FORTUNE.LOSING MEANS CERTAIN DEATH.THE HUNGER GAMES HAVE BEGUN. . . .In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and once girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.Sixteen-year-old Katniss Everdeen regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead beforeâ€”and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.",
		rating: 4.33,
		coverImg:
			'https://res.cloudinary.com/dcurf3qko/image/upload/h_800,c_fill,q_auto,f_auto/hunger-games_l37xmh.jpg',
		language: 'English',
		slug: 'the-hunger-games',
	},
	{
		// id: 2,
		title: 'Harry Potter and the Order of the Phoenix',
		author: 'J.K. Rowling, Mary GrandPre (Illustrator)',
		genres: [
			'Fantasy',
			'Young Adult',
			'Fiction',
			'Magic',
			'Childrens',
			'Adventure',
			'Audiobook',
			'Middle Grade',
			'Classics',
			'Science Fiction Fantasy',
		],
		price: 7.38,
		description:
			'There is a door at the end of a silent corridor. And itâ€™s haunting Harry Pottterâ€™s dreams. Why else would he be waking in the middle of the night, screaming in terror?Harry has a lot on his mind for this, his fifth year at Hogwarts: a Defense Against the Dark Arts teacher with a personality like poisoned honey; a big surprise on the Gryffindor Quidditch team; and the looming terror of the Ordinary Wizarding Level exams. But all these things pale next to the growing threat of He-Who-Must-Not-Be-Named - a threat that neither the magical government nor the authorities at Hogwarts can stop.As the grasp of darkness tightens, Harry must discover the true depth and strength of his friends, the importance of boundless loyalty, and the shocking price of unbearable sacrifice.His fate depends on them all.',
		rating: 4.5,
		coverImg:
			'https://res.cloudinary.com/dcurf3qko/image/upload/h_800,c_fill,q_auto,f_auto/harry-potter-phoenix_k4bxto.jpg',
		language: 'English',
		slug: 'harry-potter-and-the-order-of-the-phoenix',
	},
	{
		// id: 3,
		title: 'To Kill a Mockingbird',
		author: 'Harper Lee',
		genres: [
			'Classics',
			'Fiction',
			'Historical Fiction',
			'School',
			'Literature',
			'YoungAdult',
			'Historical',
			'Novels',
			'ReadForSchool',
			'HighSchool',
		],
		price: 7.38,
		description:
			'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.Compassionate, dramatic, and deeply moving, To Kill A Mockingbird takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.',
		rating: 4.28,
		coverImg:
			'https://res.cloudinary.com/dcurf3qko/image/upload/h_800,c_fill,q_auto,f_auto/mockingbird_lh5uvn.jpg',
		language: 'English',
		slug: 'to-kill-a-mockingbird',
	},
	{
		// id: 4,
		title: 'Pride and Prejudice',
		author: 'Jane Austen, Anna Quindlen (Introduction)',
		genres: [
			'Classics',
			'Fiction',
			'Romance',
			'Historical Fiction',
			'Literature',
			'Historical',
			'Novels',
			'Historical Romance',
			'Classic Literature',
			'Adult',
		],
		price: 5.09,
		description:
			'Alternate cover edition of ISBN 9780679783268Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work "her own darling child" and its vivacious heroine, Elizabeth Bennet, "as delightful a creature as ever appeared in print." The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austens radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England',
		rating: 4.26,
		coverImg:
			'https://res.cloudinary.com/dcurf3qko/image/upload/h_800,c_fill,q_auto,f_auto/pride-and-prejudice_ubvnbw.jpg',
		language: 'English',
		slug: 'pride-and-prejudice',
	},
	{
		// id: 5,
		title: 'Twilight',
		author: 'Stephenie Meyer',
		genres: [
			'Classics',
			'Fiction',
			'Romance',
			'Historical Fiction',
			'Literature',
			'Historical',
			'Novels',
			'Historical Romance',
			'Classic Literature',
			'Adult',
		],
		price: 2.1,
		description:
			'About three things I was absolutely positive. First, Edward was a vampire. Second, there was a part of himâ€”and I didnt know how dominant that part might beâ€”that thirsted for my blood. And third, I was unconditionally and irrevocably in love with him. Deeply seductive and extraordinarily suspenseful, Twilight is a love story with bite.',
		rating: 3.6,
		coverImg:
			'https://res.cloudinary.com/dcurf3qko/image/upload/h_800,c_fill,q_auto,f_auto/twilight_cxyhbm.jpg',
		language: 'English',
		slug: 'twilight',
	},
];

// export async function main() {
// 	for (const book of booksData) {
// 		await prisma.book.create({ data: book });
// 	}
// }

export async function main() {
	for (const book of booksData) {
		await prisma.book.upsert({
			where: { slug: book.slug },
			update: book, // or specify only the fields you want to update
			create: book,
		});
	}
}

main();
