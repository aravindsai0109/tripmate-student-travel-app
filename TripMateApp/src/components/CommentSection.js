import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useAuth,
} from '../../context/AuthContext';

import {
  addTripComment,
  subscribeToTripComments,
  MAX_COMMENT_LENGTH,
} from '../services/commentService';

import colors from '../theme/colors';

export default function CommentsSection({
  tripId,
}) {
  const {
    user,
  } = useAuth();

  const [
    comments,
    setComments,
  ] = useState([]);

  const [
    commentText,
    setCommentText,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    posting,
    setPosting,
  ] = useState(false);

  const [
    loadError,
    setLoadError,
  ] = useState('');

  useEffect(() => {
    setLoading(true);
    setLoadError('');

    const unsubscribe =
      subscribeToTripComments(
        tripId,

        (updatedComments) => {
          setComments(
            updatedComments
          );

          setLoading(false);
        },

        (error) => {
          console.error(
            'Comment listener error:',
            error
          );

          setLoadError(
            'Unable to load comments.'
          );

          setLoading(false);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [tripId]);

  const handlePostComment =
    async () => {
      const trimmedComment =
        commentText.trim();

      if (!trimmedComment) {
        Alert.alert(
          'Invalid comment',
          'Please enter a comment before posting.'
        );

        return;
      }

      if (
        trimmedComment.length >
        MAX_COMMENT_LENGTH
      ) {
        Alert.alert(
          'Comment too long',
          `Comments can contain a maximum of ${MAX_COMMENT_LENGTH} characters.`
        );

        return;
      }

      try {
        setPosting(true);

        await addTripComment({
          tripId,
          user,
          text: trimmedComment,
        });

        setCommentText('');
      } catch (error) {
        console.error(
          'Post comment error:',
          error
        );

        Alert.alert(
          'Unable to post comment',
          error.message ||
            'Please try again.'
        );
      } finally {
        setPosting(false);
      }
    };

  const formatTimestamp = (
    timestamp
  ) => {
    if (!timestamp) {
      return 'Just now';
    }

    try {
      const date =
        typeof timestamp.toDate ===
        'function'
          ? timestamp.toDate()
          : new Date(timestamp);

      return date.toLocaleString();
    } catch (error) {
      return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.title}>
            Trip Comments
          </Text>

          <Text style={styles.subtitle}>
            Share your thoughts with
            other students.
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {comments.length}
          </Text>
        </View>
      </View>

      <View style={styles.inputCard}>
        <View style={styles.userRow}>
          <View
            style={styles.avatar}
          >
            <Ionicons
              name="person"
              size={18}
              color={colors.primary}
            />
          </View>

          <Text
            style={styles.userName}
            numberOfLines={1}
          >
            {user?.displayName ||
              'Student'}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          placeholderTextColor={
            colors.textSecondary
          }
          value={commentText}
          onChangeText={
            setCommentText
          }
          multiline
          maxLength={
            MAX_COMMENT_LENGTH
          }
          editable={!posting}
          textAlignVertical="top"
        />

        <View style={styles.inputFooter}>
          <Text
            style={
              styles.characterCount
            }
          >
            {commentText.length}/
            {MAX_COMMENT_LENGTH}
          </Text>

          <TouchableOpacity
            style={[
              styles.postButton,

              posting && {
                opacity: 0.6,
              },
            ]}
            onPress={
              handlePostComment
            }
            disabled={posting}
          >
            {posting ? (
              <ActivityIndicator
                size="small"
                color={colors.white}
              />
            ) : (
              <>
                <Ionicons
                  name="send"
                  size={16}
                  color={colors.white}
                />

                <Text
                  style={
                    styles.postButtonText
                  }
                >
                  Post
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View
          style={
            styles.loadingContainer
          }
        >
          <ActivityIndicator
            size="small"
            color={colors.primary}
          />

          <Text
            style={styles.loadingText}
          >
            Loading comments...
          </Text>
        </View>
      ) : loadError ? (
        <View style={styles.messageCard}>
          <Ionicons
            name="alert-circle-outline"
            size={21}
            color={colors.textSecondary}
          />

          <Text
            style={styles.messageText}
          >
            {loadError}
          </Text>
        </View>
      ) : comments.length === 0 ? (
        <View style={styles.messageCard}>
          <Ionicons
            name="chatbubble-outline"
            size={22}
            color={colors.textSecondary}
          />

          <Text
            style={styles.messageText}
          >
            No comments yet. Be the
            first to comment.
          </Text>
        </View>
      ) : (
        <View>
          {comments.map(
            (comment) => (
              <View
                key={comment.id}
                style={
                  styles.commentCard
                }
              >
                <View
                  style={
                    styles.commentHeader
                  }
                >
                  <View
                    style={
                      styles.commentAvatar
                    }
                  >
                    <Ionicons
                      name="person"
                      size={15}
                      color={
                        colors.primary
                      }
                    />
                  </View>

                  <View
                    style={
                      styles.commentHeaderText
                    }
                  >
                    <Text
                      style={
                        styles.commentAuthor
                      }
                    >
                      {comment.userName ||
                        'Student'}
                    </Text>

                    <Text
                      style={
                        styles.commentTime
                      }
                    >
                      {formatTimestamp(
                        comment.createdAt
                      )}
                    </Text>
                  </View>
                </View>

                <Text
                  style={
                    styles.commentText
                  }
                >
                  {comment.text}
                </Text>
              </View>
            )
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },

  headingRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 12,
    color:
      colors.textSecondary,
  },

  countBadge: {
    minWidth: 30,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 15,
    backgroundColor:
      colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  countText: {
    color: colors.primary,
    fontWeight: '800',
  },

  inputCard: {
    backgroundColor:
      colors.white,
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor:
      colors.border,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor:
      colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userName: {
    flex: 1,
    marginLeft: 9,
    fontWeight: '700',
    color: colors.text,
  },

  input: {
    minHeight: 85,
    maxHeight: 150,
    borderWidth: 1,
    borderColor:
      colors.border,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 11,
    color: colors.text,
    backgroundColor:
      colors.background,
  },

  inputFooter: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  characterCount: {
    fontSize: 11,
    color:
      colors.textSecondary,
  },

  postButton: {
    minWidth: 86,
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 13,
    backgroundColor:
      colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  postButtonText: {
    marginLeft: 6,
    color: colors.white,
    fontWeight: '800',
  },

  loadingContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 8,
    color:
      colors.textSecondary,
  },

  messageCard: {
    marginTop: 12,
    paddingVertical: 22,
    paddingHorizontal: 15,
    backgroundColor:
      colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor:
      colors.border,
    alignItems: 'center',
  },

  messageText: {
    marginTop: 7,
    textAlign: 'center',
    color:
      colors.textSecondary,
  },

  commentCard: {
    marginTop: 12,
    padding: 15,
    backgroundColor:
      colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor:
      colors.border,
  },

  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor:
      colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  commentHeaderText: {
    flex: 1,
    marginLeft: 9,
  },

  commentAuthor: {
    fontWeight: '800',
    color: colors.text,
  },

  commentTime: {
    marginTop: 2,
    fontSize: 11,
    color:
      colors.textSecondary,
  },

  commentText: {
    marginTop: 11,
    lineHeight: 20,
    color: colors.text,
  },
});