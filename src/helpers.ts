import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
    CollectNFTTransferred,
  Collected,
  CommentCreated,
  DispatcherSet,
  FollowModuleSet,
  FollowNFTTransferred,
  FollowNFTURISet,
  Followed,
  Mirror,
  Post,
  Profile,
} from "../generated/schema";

export function getOrCreateProfile(
  profileId: string,
  creator: Bytes,
  to: Bytes,
  handle: string,
  imageURI: string,
  followNFTURI: string,
  followModule: Bytes,
  followModuleReturnData: Bytes,
  timestamp: BigInt,
  dispatcher: DispatcherSet
): Profile {
  //   let id = transactionHash.concatI32(logIndex.toI32());
  let profile = Profile.load(profileId);
  if (!profile) {
    profile = new Profile(profileId);
    // profile.profileId = profileId;
    profile.creator = creator;
    profile._to = to;
    profile.dispatcher = dispatcher.id;
    profile.handle = handle;
    profile.imageURI = imageURI;
    profile.totalComments = BigInt.fromI32(0);
    profile.totalPosts = BigInt.fromI32(0);
    profile.followNFTURI = followNFTURI;
    profile.followModule = followModule;
    profile.followModuleReturnData = followModuleReturnData;
    profile.dateCreated = timestamp;
    profile.save();
  }

  return profile;
}

export function getOrCreatePost(
  profileId: Profile,
  pubId: BigInt,
  contentURI: string,
  collectModule: Bytes,
  collectModuleReturnData: Bytes,
  referenceModule: Bytes,
  referenceModuleReturnData: Bytes,
  timestamp: BigInt,
  transactionHash: Bytes,
  logIndex: BigInt
): Post {
  let id = transactionHash.concatI32(logIndex.toI32());
  let newPost = Post.load(id);
  if (!newPost) {
    newPost = new Post(id);
    newPost.profileId = profileId.id;
    newPost.pubId = pubId;
    newPost.contentURI = contentURI;
    newPost.collectModule = collectModule;
    newPost.collectModuleReturnData = collectModuleReturnData;
    newPost.referenceModule = referenceModule;
    newPost.referenceModuleReturnData = referenceModuleReturnData;
    newPost.datePosted = timestamp;
    newPost.save();
  }

  return newPost;
}

export function getOrCreateMirror(
  profileId: Profile,
  pubId: BigInt,
  profileIdPointed: BigInt,
  pubIdPointed: BigInt,
  referenceModule: Bytes,
  referenceModuleReturnData: Bytes,
  dateCreated: BigInt,
  transactionHash: Bytes,
  logIndex: BigInt
): Mirror {
  let id = transactionHash.concatI32(logIndex.toI32());
  let newMirror = Mirror.load(id);
  if (!newMirror) {
    newMirror = new Mirror(id);
    newMirror.profileId = profileId.id;
    newMirror.pubId = pubId;
    newMirror.profileIdPointed = profileIdPointed;
    newMirror.pubIdPointed = pubIdPointed;
    newMirror.referenceModule = referenceModule;
    newMirror.referenceModuleReturnData = referenceModuleReturnData;
    newMirror.dateCreated = dateCreated;
    newMirror.save();
  }

  return newMirror;
}

export function getOrCreateComment(
  profileId: Profile,
  pubId: BigInt,
  contentURI: string,
  profileIdPointed: BigInt,
  pubIdPointed: BigInt,
  referenceModuleData: Bytes,
  collectModule: Bytes,
  collectModuleReturnData: Bytes,
  referenceModule: Bytes,
  referenceModuleReturnData: Bytes,
  dateCreated: BigInt,
  transactionHash: Bytes,
  logIndex: BigInt
): CommentCreated {
  let id = transactionHash.concatI32(logIndex.toI32());
  let comment = CommentCreated.load(id);
  if (!comment) {
    comment = new CommentCreated(id);
    comment.profileId = profileId.id.toString();
    comment.pubId = pubId;
    comment.contentURI = contentURI;
    comment.profileIdPointed = profileIdPointed;
    comment.pubIdPointed = pubIdPointed;
    comment.referenceModuleData = referenceModuleData;
    comment.collectModule = collectModule;
    comment.collectModuleReturnData = collectModuleReturnData;
    comment.referenceModule = referenceModule;
    comment.referenceModuleReturnData = referenceModuleReturnData;
    comment.timestamp = dateCreated;
    comment.transactionHash = transactionHash;

    comment.save();
  }

  return comment;
}

export function getOrCreateDispatcher(
  profileId: Profile,
  dispatcher: Bytes,
  timestamp: BigInt,
  transactionHash: Bytes,
  logIndex: BigInt
): DispatcherSet {
  let id = transactionHash.concatI32(logIndex.toI32());
  let dispatch = DispatcherSet.load(id);
  if (!dispatch) {
    dispatch = new DispatcherSet(id);
    dispatch.profileId = profileId.id;
    dispatch.dispatcher = dispatcher;
    dispatch.timestamp = timestamp;
    dispatch.transactionHash = transactionHash;
    dispatch.save();
  }
  return dispatch;
}

export function getOrCreateFollowModule(
  profileId: Profile,
  followModule: Bytes,
  followModuleReturnData: Bytes,
  timestamp: BigInt,
  transactionHash: Bytes,
  logIndex: BigInt
): FollowModuleSet {
  let id = transactionHash.concatI32(logIndex.toI32());
  let followMod = FollowModuleSet.load(id);
  if (!followMod) {
    followMod = new FollowModuleSet(id);
    followMod.profileId = profileId.id;
    followMod.followModule = followModule;
    followMod.followModuleReturnData = followModuleReturnData;
    followMod.timestamp = timestamp;
    followMod.transactionHash = transactionHash;
    followMod.save();
  }
  return followMod;
}

export function getOrCreateFollowNFTTransfer(
  profileId: Profile,
  followNFTId: BigInt,
  from: Bytes,
  to: Bytes,
  timestamp: BigInt,
  transactionHash: Bytes,
  logIndex: BigInt
): FollowNFTTransferred {
  let id = transactionHash.concatI32(logIndex.toI32());
  let ffNftTransfer = FollowNFTTransferred.load(id);
  if (!ffNftTransfer) {
    ffNftTransfer = new FollowNFTTransferred(id);
    ffNftTransfer.profileId = profileId.id;
    ffNftTransfer.followNFTId = followNFTId;
    ffNftTransfer.from = from;
    ffNftTransfer.to = to;
    ffNftTransfer.timestamp = timestamp;
    ffNftTransfer.transactionHash = transactionHash;
    ffNftTransfer.save();
  }
  return ffNftTransfer;
}


export function getOrCreateFollowNFTURI(
    profileId: Profile,
    followNFTURI: string,
    timestamp: BigInt,
    transactionHash: Bytes,
    logIndex: BigInt
  ): FollowNFTURISet {
    let id = transactionHash.concatI32(logIndex.toI32());
    let nftUriSet = FollowNFTURISet.load(id);
    if (!nftUriSet) {
      nftUriSet = new FollowNFTURISet(id);
      nftUriSet.profileId = profileId.id;
      nftUriSet.followNFTURI = followNFTURI;
      nftUriSet.timestamp = timestamp;
      nftUriSet.transactionHash = transactionHash;
      nftUriSet.save();
    }
    return nftUriSet;
  }

export function getOrCreateCollectNFTTransferred(
    profileId: Profile,
    pubId: BigInt,
    collectNFTId: BigInt,
    from: Bytes,
    to: Bytes,
    timestamp: BigInt,
    transactionHash: Bytes,
    logIndex: BigInt
  ): CollectNFTTransferred {
    let id = transactionHash.concatI32(logIndex.toI32());
    let collectNftTransfer = CollectNFTTransferred.load(id);
    if (!collectNftTransfer) {
      collectNftTransfer = new CollectNFTTransferred(id);
      collectNftTransfer.profileId = profileId.id;
      collectNftTransfer.pubId = pubId;
      collectNftTransfer.collectNFTId = collectNFTId;
      collectNftTransfer.from = from;
      collectNftTransfer.to = to;
      collectNftTransfer.timestamp = timestamp;
      collectNftTransfer.transactionHash = transactionHash;
      collectNftTransfer.save();
    }
    return collectNftTransfer;
  }
  

  export function getOrCreateCollected(
    profileId: Profile,
    collector: Bytes,
    pubId: BigInt,
    rootProfileId: Profile,
    rootPubId: BigInt,
    timestamp: BigInt,
    transactionHash: Bytes,
    logIndex: BigInt
  ): Collected {
    let id = transactionHash.concatI32(logIndex.toI32());
    let collectNftTransfer = Collected.load(id);
    if (!collectNftTransfer) {
      collectNftTransfer = new Collected(id);
      collectNftTransfer.collector = collector;
      collectNftTransfer.profileId = profileId.id;
      collectNftTransfer.pubId = pubId;
      collectNftTransfer.rootProfileId = rootProfileId.id;
      collectNftTransfer.rootPubId = rootPubId;
      collectNftTransfer.timestamp = timestamp;
      collectNftTransfer.transactionHash = transactionHash;
      collectNftTransfer.save();
    }
    return collectNftTransfer;
  }

  export function getProfile(profileId: BigInt): Profile {
    let profile = Profile.load(profileId.toString());
    if (!profile) {
      profile = new Profile(profileId.toString());
    }
    profile.save();
    return profile;
  }
  