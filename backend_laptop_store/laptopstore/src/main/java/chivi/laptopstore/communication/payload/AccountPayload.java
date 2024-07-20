package chivi.laptopstore.communication.payload;

public record AccountPayload(
        Long id,
        String username,
        String fullName,
        String email,
        String phone,
        int reviewCount,
        int likeCount
) {
}
