const mongoose = require('mongoose');
const db = require("./db/mongo");
const Post = require('./models/Post'); // Update this path to the actual location of your Post model
db()
// Utility function to generate random data
function generateRandomData() {
    const titles = ['First Post', 'Second Post', 'Amazing Article', 'Breaking News', 'Tech Innovations'];
    const contents = [
        '<h2>First Post</h2><p>This is the <strong>content</strong> of the first post. <a href="#">Read more...</a></p><ul><li>Point 1</li><li>Point 2</li></ul>',
        '<h2>Second Post</h2><p>This is the <em>content</em> of the second post. It includes an image: <img src="image2.jpg" alt="Image 2"></p>',
        '<h2>Amazing Article</h2><p>Amazing article content here with a <a href="#">link</a> and a list:</p><ol><li>Item 1</li><li>Item 2</li></ol>',
        '<h2>Breaking News</h2><p>Latest breaking news content in <strong>bold</strong> and <em>italic</em>.</p>',
        '<h2>Tech Innovations</h2><p>All about tech innovations. Including a <a href="#">hyperlink</a>.</p>'
    ];
    const comments = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()]; // Simulated comment IDs
    const tags = ['Tech', 'News', 'Innovation', 'Science', 'Education'];
    const images = ['image1.jpg', 'image2.jpg', 'image3.png'];

    // Generate random indexes to pick random items
    const titleIndex = Math.floor(Math.random() * titles.length);
    const contentIndex = Math.floor(Math.random() * contents.length);
    const tagsCount = Math.floor(Math.random() * tags.length);
    const imagesCount = Math.floor(Math.random() * images.length);

    return {
        title: titles[titleIndex],
        content: contents[contentIndex],
        author: '65d87f6f0e9384c9d4aaf906',
        summary: "测试的标题啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
        createdAt: new Date().getTime(),
        like: Math.floor(Math.random() * 100).toString(), // Random likes count
        comments: comments.slice(0, Math.floor(Math.random() * comments.length)), // Randomly select comments
        views: Math.floor(Math.random() * 5000).toString(), // Random views count
        tags: tags.slice(0, tagsCount + 1), // Randomly select tags
        images: images.slice(0, imagesCount + 1), // Randomly select images
    };
}

// Function to insert posts
async function insertRandomPosts(count) {
    const postsToInsert = [];

    for (let i = 0; i < count; i++) {
        const postData = generateRandomData();
        const post = new Post(postData);
        postsToInsert.push(post.save()); // Prepare to insert all posts in parallel
    }

    try {
        await Promise.all(postsToInsert);
        console.log(`${count} posts inserted successfully.`);
    } catch (error) {
        console.error('Error inserting posts:', error);
    }
}

// Insert 10 random posts
insertRandomPosts(30);