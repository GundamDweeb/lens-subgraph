import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  CommentCreated as CommentCreatedEvent,
  DispatcherSet as DispatcherSetEvent,
  MirrorCreated,
  PostCreated,
  ProfileCreated,
  ProfileCreatorWhitelisted,
  FollowModuleSet as FollowModuleSetEvent,
  FollowNFTTransferred1 as FollowNFTTransferred1Event,
  FollowNFTURISet as FollowNFTURISetEvent,
  Followed as FollowedEvent,
  CollectNFTTransferred as CollectNFTTransferredEvent,
  Collected as CollectedEvent,
} from "../generated/LensHub/LensHub";
import {
  Mirror,
  Post,
  Profile,
  ProfileWhitelist,
  CommentCreated,
  DispatcherSet,
  FollowModuleSet,
  FollowNFTTransferred,
  FollowNFTURISet,
  Followed,
  CollectNFTTransferred,
  Collected,
} from "../generated/schema";
import {
  getOrCreateCollectNFTTransferred,
  getOrCreateCollected,
  getOrCreateComment,
  getOrCreateDispatcher,
  getOrCreateFollowModule,
  getOrCreateFollowNFTTransfer,
  getOrCreateFollowNFTURI,
  getOrCreateMirror,
  getOrCreatePost,
  getOrCreateProfile,
  getProfile,
} from "./helpers";

export function handleProfileCreated(event: ProfileCreated): void {
  let dispatcher = DispatcherSet.load(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  if (!dispatcher) {
    dispatcher = new DispatcherSet(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    );
  }
  getOrCreateProfile(
    event.params.profileId.toString(),
    event.params.creator,
    event.params.to,
    event.params.handle,
    event.params.imageURI,
    event.params.followNFTURI,
    event.params.followModule,
    event.params.followModuleReturnData,
    event.params.timestamp,
    dispatcher
  );
}

export function handleProfileCreatorWhitelisted(
  event: ProfileCreatorWhitelisted
): void {
  let whitelist = new ProfileWhitelist(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  whitelist.creator = event.params.profileCreator;
  whitelist.whitelisted = event.params.whitelisted;

  whitelist.date = event.params.timestamp;
  whitelist.save();
}

export function handlePostCreated(event: PostCreated): void {
  let profile = getProfile(event.params.profileId);
  getOrCreatePost(
    profile,
    event.params.pubId,
    event.params.contentURI,
    event.params.collectModule,
    event.params.collectModuleReturnData,
    event.params.referenceModule,
    event.params.referenceModuleReturnData,
    event.params.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

export function handleMirrorCreated(event: MirrorCreated): void {
  let profile = getProfile(event.params.profileId);
  getOrCreateMirror(
    profile,
    event.params.pubId,
    event.params.profileIdPointed,
    event.params.pubIdPointed,
    event.params.referenceModule,
    event.params.referenceModuleReturnData,
    event.params.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

export function handleCommentCreated(event: CommentCreatedEvent): void {
  let profile = getProfile(event.params.profileId);
  getOrCreateComment(
    profile,
    event.params.pubId,
    event.params.contentURI,
    event.params.profileIdPointed,
    event.params.pubIdPointed,
    event.params.referenceModuleData,
    event.params.collectModule,
    event.params.collectModuleReturnData,
    event.params.referenceModule,
    event.params.referenceModuleReturnData,
    event.params.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

export function handleDispatcherSet(event: DispatcherSetEvent): void {
  let profile = getProfile(event.params.profileId);
  getOrCreateDispatcher(
    profile,
    event.params.dispatcher,
    event.params.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

export function handleFollowModuleSet(event: FollowModuleSetEvent): void {
  let profile = getProfile(event.params.profileId);
  getOrCreateFollowModule(
    profile,
    event.params.followModule,
    event.params.followModuleReturnData,
    event.params.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

export function handleFollowNFTTransferred(
  event: FollowNFTTransferred1Event
): void {
  let profile = getProfile(event.params.profileId);
  getOrCreateFollowNFTTransfer(
    profile,
    event.params.followNFTId,
    event.params.from,
    event.params.to,
    event.params.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

export function handleFollowNFTURISet(event: FollowNFTURISetEvent): void {
  let profile = getProfile(event.params.profileId);
  getOrCreateFollowNFTURI(
    profile,
    event.params.followNFTURI,
    event.params.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

export function handleFollowed(event: FollowedEvent): void {
  let entity = new Followed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.follower = event.params.follower;
  entity.profileIds = event.params.profileIds.map<string>(
    (profileIds: BigInt) => profileIds.toString()
  );
  entity.followModuleDatas = event.params.followModuleDatas;
  entity.timestamp = event.params.timestamp;

  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCollectNFTTransferred(
  event: CollectNFTTransferredEvent
): void {
  let profile = getProfile(event.params.profileId);
  getOrCreateCollectNFTTransferred(
    profile,
    event.params.pubId,
    event.params.collectNFTId,
    event.params.from,
    event.params.to,
    event.params.timestamp,
    event.transaction.hash,
    event.logIndex
  );
}

export function handleCollected(event: CollectedEvent): void {
  let profile = getProfile(event.params.profileId);
  let rootProfileId = getProfile(event.params.rootProfileId);

  getOrCreateCollected(
    profile,
    event.params.collector,
    event.params.pubId,
    rootProfileId,
    event.params.rootPubId,
    event.params.timestamp,
    event.transaction.hash,
    event.logIndex
    )
}
