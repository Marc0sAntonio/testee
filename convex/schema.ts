import { error } from "console";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({ 
    users: defineTable({
        userId: v.string(), //cleckId, v is a validator of convex/values
        email: v.string(),
        name: v.string(),
        isPro: v.boolean(),
        proSince: v.optional(v.number()),
        lemonSqueezyCustomerId: v.optional(v.string()), // is is not a costomer gonna be undefined
        lemonSqueezyOrderId: v.optional(v.string()),
    }).index("by_user_id", ["userId"]), // to seacrh by user id

    codeExecutions: defineTable({
        userId: v.string(),
        language: v.string(),
        code: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string()),
    }).index("by_user_id", ["userId"]),

    snippets: defineTable({
        userId: v.string(),
        title: v.string(),
        language: v.string(),
        code: v.string(),
        userName: v.string(), // store user's name for easy search
    }).index("by_user_id", ["userId"]),

    snippetComments: defineTable({
        snippetId: v.id("snippets"),
        userId: v.string(),
        userName: v.string(),
        content: v.string(), // this will store HTML content
    }).index("by_snippet_id", ["snippetId"]),

    stars: defineTable({
        userId: v.id("users"),
        snippetId: v.id("snippets"),
    })
        .index("by_user_id", ["userId"])
        .index("by_snippet_id", ["snippetId"])
        .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),
});