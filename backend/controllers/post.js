const Post = require('../models/Post');

async function addPost(post) {
	const newPost = await Post.create(post);
	await newPost.populate({
		path: 'comments',
		populate: 'author',
	});

	return newPost;
}
function getPost(id) {
	return Post.findById(id).populate({
		path: 'comments',
		populate: 'author',
	});
}

function deletePost(id) {
	return Post.deleteOne({ _id: id });
}

async function editPost(id, post) {
	const updatedPost = await Post.findByIdAndUpdate(id, post, { returnDocument: 'after' });

	await updatedPost.populate({
		path: 'comments',
		populate: 'author',
	});
	return updatedPost;
}

async function getPosts(search = '', limit = 10, page = 1) {
	const [posts, count] = await Promise.all([
		Post.find({ title: { $regex: search, $options: 'i' } })
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
	]);

	return {
		posts,
		lastPage: Math.ceil(count / limit),
	};
}

module.exports = {
	getPost,
	getPosts,
	addPost,
	editPost,
	deletePost,
};
