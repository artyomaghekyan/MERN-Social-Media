import mongoose from "mongoose";
import Post from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").exec();
    if (!posts) {
      res.status(404).json({ message: "Posts are currnetly unaveble" });
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(400).json({ message: "Somethong went wrong" });
    console.log(err);
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      return res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(err);
  }
};

export const create = async (req, res) => {
  try {
    const doc = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(err);
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post was deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete the post" });
    console.log(err);
  }
};

export const update = async (req, res) => {
  const currentPost = Post.findById(req.params.id);
  const updatorUserId = req.userId;
  if (currentPost.user !== updatorUserId) {
    return res.status(403).json({ message: "Access Denied" });
  }
  try {
    const postUpdates = {
      $set: {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },
    };
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(postId, postUpdates, {
      returnDocument: "after",
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: "Failed to update the post" });
    console.log(err);
  }
};
